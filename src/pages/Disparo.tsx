
import { Send, Users, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const Disparo = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Disparo</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Send className="h-4 w-4 mr-2" />
          Novo Disparo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-blue-600" />
              Disparo em Massa
            </CardTitle>
            <CardDescription>
              Envie mensagens para múltiplos contatos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Criar Disparo
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              Listas de Contatos
            </CardTitle>
            <CardDescription>
              Gerencie suas listas de contatos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Ver Listas
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              Templates
            </CardTitle>
            <CardDescription>
              Crie e gerencie templates de mensagens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Ver Templates
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Disparo
