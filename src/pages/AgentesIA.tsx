
import { Bot, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const AgentesIA = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Agentes de IA</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Criar Agente
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Agentes Inteligentes
          </CardTitle>
          <CardDescription>
            Crie e gerencie seus agentes de IA para atendimento automatizado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <Bot className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Nenhum agente criado</p>
              <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                Criar Primeiro Agente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AgentesIA
