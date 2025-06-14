
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, DollarSign, Users, FileText, Settings, TrendingUp, Calendar, Download } from "lucide-react"

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-600">Meu Primeiro Quadro</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-purple-50 border-purple-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-lg font-semibold text-purple-900">Kanban</CardTitle>
              <CardDescription className="text-sm text-purple-700">Gestão de negócios</CardDescription>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart className="h-6 w-6 text-purple-600" />
            </div>
          </CardHeader>
        </Card>

        <Card className="bg-green-50 border-green-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-lg font-semibold text-green-900">Financeiro</CardTitle>
              <CardDescription className="text-sm text-green-700">Controle financeiro</CardDescription>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </CardHeader>
        </Card>

        <Card className="bg-orange-50 border-orange-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-lg font-semibold text-orange-900">Contratos</CardTitle>
              <CardDescription className="text-sm text-orange-700">Gestão de contratos</CardDescription>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
          </CardHeader>
        </Card>

        <Card className="bg-blue-50 border-blue-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-lg font-semibold text-blue-900">Configurações</CardTitle>
              <CardDescription className="text-sm text-blue-700">Ajustes do sistema</CardDescription>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Settings className="h-6 w-6 text-blue-600" />
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-purple-100 rounded">
                <DollarSign className="h-4 w-4 text-purple-600" />
              </div>
              <CardTitle className="text-sm font-medium text-gray-600">Valor Total em Negociação</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-gray-900">R$ 1.000,00</div>
            <p className="text-sm text-gray-500">No quadro selecionado</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-100 rounded">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <CardTitle className="text-sm font-medium text-gray-600">Vendas Concluídas</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-gray-900">R$ 0,00</div>
            <p className="text-sm text-gray-500">No período selecionado</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-blue-100 rounded">
                <BarChart className="h-4 w-4 text-blue-600" />
              </div>
              <CardTitle className="text-sm font-medium text-gray-600">Taxa de Conversão</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-gray-900">0.0%</div>
            <p className="text-sm text-gray-500">Vendas concluídas / Total em negociação</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Movimentação Financeira</CardTitle>
            <CardDescription>14/05/2025 até 13/06/2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Gráfico de movimentação financeira</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Status dos Contratos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">0</div>
                <p className="text-gray-500">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seções inferiores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-600" />
              <CardTitle className="text-lg font-semibold">Top Vendedores</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="mb-4">Não há cartões na lista concluída</p>
              <div className="flex items-center justify-center gap-4">
                <button className="text-purple-600 hover:text-purple-700 font-medium">
                  Mudar quadro
                </button>
                <span className="text-gray-400">|</span>
                <button className="text-purple-600 hover:text-purple-700 font-medium">
                  Verificação Automática
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-600" />
              <CardTitle className="text-lg font-semibold">Próximos Eventos</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="mb-4">Não há eventos programados para os próximos 7 dias</p>
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                Ver calendário completo →
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
