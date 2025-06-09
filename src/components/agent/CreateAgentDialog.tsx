
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Settings, Link2 } from 'lucide-react'
import { CreateAgentData } from '@/types/agent'

interface CreateAgentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateAgent: (agentData: CreateAgentData) => void
}

export const CreateAgentDialog = ({ open, onOpenChange, onCreateAgent }: CreateAgentDialogProps) => {
  const [formData, setFormData] = useState<CreateAgentData>({
    name: '',
    description: '',
    instructions: '',
    personality: 'professional',
    language: 'pt-BR',
    responseStyle: 'balanced',
    integrations: []
  })
  const [showIntegrationInfo, setShowIntegrationInfo] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreateAgent(formData)
    setFormData({
      name: '',
      description: '',
      instructions: '',
      personality: 'professional',
      language: 'pt-BR',
      responseStyle: 'balanced',
      integrations: []
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Agente de IA</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Agente</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Assistente de Vendas"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Idioma</Label>
              <Select value={formData.language} onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="es-ES">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva o propósito e função do agente"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instruções do Sistema</Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
              placeholder="Defina como o agente deve se comportar, suas responsabilidades e limitações"
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="personality">Personalidade</Label>
              <Select value={formData.personality} onValueChange={(value: any) => setFormData(prev => ({ ...prev, personality: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Profissional</SelectItem>
                  <SelectItem value="friendly">Amigável</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="technical">Técnico</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="responseStyle">Estilo de Resposta</Label>
              <Select value={formData.responseStyle} onValueChange={(value: any) => setFormData(prev => ({ ...prev, responseStyle: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concise">Conciso</SelectItem>
                  <SelectItem value="balanced">Equilibrado</SelectItem>
                  <SelectItem value="detailed">Detalhado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Integrações HTTP</Label>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Link2 className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">
                  {formData.integrations.length}/3 integrações configuradas
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                As integrações HTTP serão configuradas após criar o agente. Você poderá adicionar até 3 integrações para permitir que o agente faça requisições para APIs externas.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowIntegrationInfo(!showIntegrationInfo)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                {showIntegrationInfo ? 'Ocultar' : 'Ver'} Detalhes
              </Button>
              {showIntegrationInfo && (
                <div className="mt-3 text-xs text-gray-600 space-y-1">
                  <p>• Configure métodos HTTP (GET, POST, PUT, PATCH, DELETE)</p>
                  <p>• Defina URLs, headers, query parameters e body</p>
                  <p>• Especifique quando o agente deve usar cada integração</p>
                  <p>• Liste os dados necessários para fazer as requisições</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Criar Agente
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
