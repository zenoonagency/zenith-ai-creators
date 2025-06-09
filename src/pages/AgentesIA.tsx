
import { useState } from "react"
import { Bot, Plus, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreateAgentDialog } from "@/components/agent/CreateAgentDialog"
import { AgentCard } from "@/components/agent/AgentCard"
import { Agent, CreateAgentData } from "@/types/agent"

const AgentesIA = () => {
  const [agents, setAgents] = useState<Agent[]>([])
  const [showCreateAgent, setShowCreateAgent] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleCreateAgent = (agentData: CreateAgentData) => {
    const newAgent: Agent = {
      ...agentData,
      id: Date.now().toString(),
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setAgents(prev => [...prev, newAgent])
  }

  const handleEditAgent = (agent: Agent) => {
    // TODO: Implementar edição do agente
    console.log('Editar agente:', agent)
  }

  const handleDeleteAgent = (agentId: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== agentId))
  }

  const handleToggleActive = (agentId: string, isActive: boolean) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, isActive, updatedAt: new Date().toISOString() }
        : agent
    ))
  }

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Agentes de IA</h1>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => setShowCreateAgent(true)}
        >
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
          {agents.length === 0 ? (
            <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <Bot className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 mb-4">Nenhum agente criado</p>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => setShowCreateAgent(true)}
                >
                  Criar Primeiro Agente
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar agentes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <span className="text-sm text-gray-500">
                  {filteredAgents.length} agente{filteredAgents.length !== 1 ? 's' : ''} encontrado{filteredAgents.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAgents.map(agent => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onEdit={handleEditAgent}
                    onDelete={handleDeleteAgent}
                    onToggleActive={handleToggleActive}
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <CreateAgentDialog
        open={showCreateAgent}
        onOpenChange={setShowCreateAgent}
        onCreateAgent={handleCreateAgent}
      />
    </div>
  )
}

export default AgentesIA
