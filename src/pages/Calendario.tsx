
import { useState } from "react"
import { Calendar, Plus, Settings, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useGoogleCalendar } from "@/hooks/useGoogleCalendar"
import { GoogleCalendarViewer } from "@/components/GoogleCalendarViewer"

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
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [data, setData] = useState('')
  const [hora, setHora] = useState('')

  const { isSignedIn, isLoading, signIn, signOut } = useGoogleCalendar()

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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Calendário</h1>
        <div className="flex items-center justify-center h-64">
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Calendário</h1>
        <div className="flex gap-2">
          {isSignedIn ? (
            <>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <ExternalLink className="h-3 w-3 mr-1" />
                Google Calendar Conectado
              </Badge>
              <Button 
                variant="outline" 
                onClick={signOut}
                className="border-red-200 text-red-700 hover:bg-red-50"
              >
                Desconectar
              </Button>
            </>
          ) : (
            <Button 
              variant="outline" 
              onClick={signIn}
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Conectar Google Calendar
            </Button>
          )}
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => setShowCreateEvent(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Evento Local
          </Button>
        </div>
      </div>

      {/* Google Calendar Section */}
      {isSignedIn && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Google Calendar
            </CardTitle>
            <CardDescription>
              Seus eventos sincronizados do Google Calendar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GoogleCalendarViewer />
          </CardContent>
        </Card>
      )}

      {/* Local Events Section */}
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
          {!isSignedIn ? (
            <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 mb-4">Conecte com Google Calendar para sincronizar seus eventos</p>
                <Button 
                  onClick={signIn}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Conectar Google Calendar
                </Button>
              </div>
            </div>
          ) : (
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
          )}
        </CardContent>
      </Card>

      <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Evento Local</DialogTitle>
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
    </div>
  )
}

export default Calendario
