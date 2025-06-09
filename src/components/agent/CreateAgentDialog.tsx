
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
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
    knowledge: []
  })
  const [knowledgeInput, setKnowledgeInput] = useState('')

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
      knowledge: []
    })
    setKnowledgeInput('')
    onOpenChange(false)
  }

  const addKnowledge = () => {
    if (knowledgeInput.trim() && !formData.knowledge.includes(knowledgeInput.trim())) {
      setFormData(prev => ({
        ...prev,
        knowledge: [...prev.knowledge, knowledgeInput.trim()]
      }))
      setKnowledgeInput('')
    }
  }

  const removeKnowledge = (knowledge: string) => {
    setFormData(prev => ({
      ...prev,
      knowledge: prev.knowledge.filter(k => k !== knowledge)
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addKnowledge()
    }
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
            <Label htmlFor="knowledge">Base de Conhecimento</Label>
            <div className="flex gap-2">
              <Input
                id="knowledge"
                value={knowledgeInput}
                onChange={(e) => setKnowledgeInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Adicione tópicos de conhecimento"
              />
              <Button type="button" onClick={addKnowledge} variant="outline">
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.knowledge.map((knowledge, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {knowledge}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeKnowledge(knowledge)}
                  />
                </Badge>
              ))}
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
