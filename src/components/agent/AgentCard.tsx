
import { Bot, Settings, MoreVertical, Play, Pause, Link2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Agent } from '@/types/agent'

interface AgentCardProps {
  agent: Agent
  onEdit: (agent: Agent) => void
  onDelete: (agentId: string) => void
  onToggleActive: (agentId: string, isActive: boolean) => void
}

export const AgentCard = ({ agent, onEdit, onDelete, onToggleActive }: AgentCardProps) => {
  const personalityColors = {
    professional: 'bg-blue-100 text-blue-800',
    friendly: 'bg-green-100 text-green-800',
    casual: 'bg-yellow-100 text-yellow-800',
    formal: 'bg-gray-100 text-gray-800',
    technical: 'bg-purple-100 text-purple-800'
  }

  const responseStyleLabels = {
    concise: 'Conciso',
    balanced: 'Equilibrado',
    detailed: 'Detalhado'
  }

  return (
    <Card className={`transition-all hover:shadow-md ${agent.isActive ? 'border-green-200 bg-green-50/30' : 'border-gray-200'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${agent.isActive ? 'bg-green-100' : 'bg-gray-100'}`}>
              <Bot className={`h-5 w-5 ${agent.isActive ? 'text-green-600' : 'text-gray-600'}`} />
            </div>
            <div>
              <CardTitle className="text-lg">{agent.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={personalityColors[agent.personality]}>
                  {agent.personality}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {responseStyleLabels[agent.responseStyle]}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              {agent.isActive ? <Play className="h-3 w-3 text-green-600" /> : <Pause className="h-3 w-3 text-gray-400" />}
              <Switch
                checked={agent.isActive}
                onCheckedChange={(checked) => onToggleActive(agent.id, checked)}
                className="data-[state=checked]:bg-green-600"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onEdit(agent)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Gerenciar Integrações
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(agent.id)}
                  className="text-red-600 focus:text-red-600"
                >
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{agent.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Idioma: {agent.language}</span>
            <span className="flex items-center gap-1">
              <Link2 className="h-3 w-3" />
              {agent.integrations?.length || 0} integrações
            </span>
          </div>
          
          {agent.integrations && agent.integrations.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {agent.integrations.slice(0, 2).map((integration, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {integration.name}
                </Badge>
              ))}
              {agent.integrations.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{agent.integrations.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
