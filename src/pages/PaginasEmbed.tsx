
import { Settings, Plus, Code } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const PaginasEmbed = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Páginas Embed</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Nova Página
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Páginas Incorporadas
          </CardTitle>
          <CardDescription>
            Crie e gerencie páginas para incorporar em outros sites
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <Code className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Nenhuma página embed criada</p>
              <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                Criar Primeira Página
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PaginasEmbed
