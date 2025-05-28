
import { useState } from "react"
import { Calendar, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { GoogleCalendarViewer } from '@/components/GoogleCalendarViewer'
import { GoogleCalendarEventDialog } from '@/components/GoogleCalendarEventDialog'
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar'

interface Evento {
  id: string
  titulo: string
  descricao?: string
  data: string
  hora: string
  cor: string
}

const Calendario = () => {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [showGoogleEventDialog, setShowGoogleEventDialog] = useState(false)
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [data, setData] = useState('')
  const [hora, setHora] = useState('')

  const { isSignedIn } = useGoogleCalendar()

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault()
    if (titulo && data && hora) {
      const novoEvento: Evento = {
        id: Date.now().toString(),
        titulo,
        descricao,
        data,
        hora,
        cor: '#8B5CF6'
      }
      setEventos([...eventos, novoEvento])
      setTitulo('')
      setDescricao('')
      setData('')
      setHora('')
      setShowCreateEvent(false)
    }
  }

  const handleDeleteEvent = (id: string) => {
    setEventos(eventos.filter(e => e.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Calendário</h1>
        <div className="flex gap-2">
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => setShowCreateEvent(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Evento Local
          </Button>
          {isSignedIn && (
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowGoogleEventDialog(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Evento Google
            </Button>
          )}
        </div>
      </div>

      {/* Google Calendar Integration */}
      <GoogleCalendarViewer />

      {/* Local Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Eventos Locais
          </CardTitle>
          <CardDescription>
            Eventos criados localmente nesta aplicação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {eventos.map((evento) => (
                <Card key={evento.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: evento.cor }}
                        />
                        <h3 className="font-medium">{evento.titulo}</h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEvent(evento.id)}
                        className="text-red-600 hover:text-red-700 h-6 w-6 p-0"
                      >
                        ×
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {new Date(evento.data).toLocaleDateString('pt-BR')} às {evento.hora}
                    </p>
                    {evento.descricao && (
                      <p className="text-sm text-gray-500">{evento.descricao}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {eventos.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <p>Nenhum evento local encontrado</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialog for Local Events */}
      <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Evento Local</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div>
              <Label htmlFor="titulo">Título do Evento</Label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Digite o título do evento"
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="descricao">Descrição (opcional)</Label>
              <Textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Digite uma descrição"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="data">Data</Label>
                <Input
                  id="data"
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="hora">Hora</Label>
                <Input
                  id="hora"
                  type="time"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowCreateEvent(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                Criar Evento
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Google Calendar Event Dialog */}
      <GoogleCalendarEventDialog 
        open={showGoogleEventDialog}
        onOpenChange={setShowGoogleEventDialog}
      />
    </div>
  )
}

export default Calendario
