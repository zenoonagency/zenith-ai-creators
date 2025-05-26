
import { Settings, Plus, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const GestaoFunil = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Funil</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            Escolher Quadro
          </Button>
          <Button variant="outline">
            Lista de Concluídos
          </Button>
          <Button variant="outline">
            Procurar Cartão
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Criar Automação
          </Button>
          <Button variant="outline">
            Configurar Quadro
          </Button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <Button className="bg-purple-600 hover:bg-purple-700">
          + Novo Quadro
        </Button>
        <Button variant="outline">
          Editar
        </Button>
        <Button variant="outline">
          Duplicar
        </Button>
        <Button variant="outline" className="text-red-600 hover:text-red-700">
          Excluir
        </Button>
      </div>

      <div className="space-y-4">
        {/* Coluna Pendente */}
        <Card>
          <CardHeader className="bg-gray-50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Pendente</CardTitle>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>1 cards R$ 500,00</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <Card className="mb-4">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">teste</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded">Urgente</span>
                  </div>
                  <div className="text-green-600 font-medium">R$ 500,00</div>
                  <div className="text-sm text-blue-600">1/2 subtarefas</div>
                  <div className="text-sm text-blue-600">1 anexo</div>
                  <div className="flex gap-2">
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">Agente de IA</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Marketing</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button variant="outline" className="w-full">
              + Adicionar Card
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default GestaoFunil
