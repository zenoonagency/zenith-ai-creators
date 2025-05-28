
import { useState } from "react"
import { Tag, Plus, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface Marcador {
  id: string
  nome: string
  cor: string
  descricao?: string
}

const Marcadores = () => {
  const [marcadores, setMarcadores] = useState<Marcador[]>([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [nome, setNome] = useState('')
  const [cor, setCor] = useState('#3B82F6')
  const [descricao, setDescricao] = useState('')

  const cores = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ]

  const handleCreateMarcador = (e: React.FormEvent) => {
    e.preventDefault()
    if (nome.trim()) {
      const novoMarcador: Marcador = {
        id: Date.now().toString(),
        nome: nome.trim(),
        cor,
        descricao: descricao.trim()
      }
      setMarcadores([...marcadores, novoMarcador])
      setNome('')
      setCor('#3B82F6')
      setDescricao('')
      setShowCreateDialog(false)
    }
  }

  const handleDeleteMarcador = (id: string) => {
    setMarcadores(marcadores.filter(m => m.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Marcadores</h1>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => setShowCreateDialog(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Marcador
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Gerenciar Marcadores
          </CardTitle>
          <CardDescription>
            Organize seus contatos e leads com marcadores
          </CardDescription>
        </CardHeader>
        <CardContent>
          {marcadores.length === 0 ? (
            <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <Tag className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Nenhum marcador criado</p>
                <Button 
                  className="mt-4 bg-purple-600 hover:bg-purple-700"
                  onClick={() => setShowCreateDialog(true)}
                >
                  Criar Primeiro Marcador
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {marcadores.map((marcador) => (
                <Card key={marcador.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: marcador.cor }}
                        />
                        <h3 className="font-medium">{marcador.nome}</h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMarcador(marcador.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {marcador.descricao && (
                      <p className="text-sm text-gray-600 mt-2">{marcador.descricao}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Marcador</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateMarcador} className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome do Marcador</Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome do marcador"
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="descricao">Descrição (opcional)</Label>
              <Input
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Digite uma descrição"
              />
            </div>
            <div>
              <Label>Cor do Marcador</Label>
              <div className="flex gap-2 mt-2">
                {cores.map((corOption) => (
                  <button
                    key={corOption}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 ${
                      cor === corOption ? 'border-gray-900' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: corOption }}
                    onClick={() => setCor(corOption)}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                Criar Marcador
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Marcadores
