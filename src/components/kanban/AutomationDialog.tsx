
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, Zap } from 'lucide-react'

interface Board {
  id: string
  name: string
  lists: Array<{
    id: string
    title: string
    cards: any[]
    color?: string
  }>
}

interface AutomationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  board: Board
}

interface Automation {
  id: string
  name: string
  trigger: string
  sourceListId?: string
  targetListId?: string
  webhookUrl: string
  active: boolean
}

export function AutomationDialog({ open, onOpenChange, board }: AutomationDialogProps) {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [automations] = useState<Automation[]>([])
  const [formData, setFormData] = useState({
    name: '',
    trigger: '',
    sourceListId: '',
    targetListId: '',
    webhookUrl: '',
    active: true
  })

  const triggerOptions = [
    { value: 'card_created', label: 'Quando um cartão for criado' },
    { value: 'card_created_in_list', label: 'Quando um cartão for criado em uma lista' },
    { value: 'card_moved', label: 'Quando um cartão for movido entre listas' },
  ]

  const handleCreateAutomation = () => {
    if (!formData.name || !formData.trigger) return
    
    // Aqui você implementaria a lógica para salvar a automação
    console.log('Criando automação:', formData)
    
    setFormData({
      name: '',
      trigger: '',
      sourceListId: '',
      targetListId: '',
      webhookUrl: '',
      active: true
    })
    setShowCreateForm(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-600" />
            Automações
          </DialogTitle>
        </DialogHeader>

        {!showCreateForm ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Automações configuradas</h3>
              <Button 
                onClick={() => setShowCreateForm(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Automação
              </Button>
            </div>

            {automations.length === 0 ? (
              <div className="text-center py-12">
                <Zap className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 mb-4">Nenhuma automação configurada</p>
                <p className="text-sm text-gray-400">
                  Clique em "Nova Automação" para começar
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {automations.map((automation) => (
                  <div key={automation.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{automation.name}</h4>
                        <p className="text-sm text-gray-500">{automation.trigger}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          automation.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {automation.active ? 'Ativa' : 'Inativa'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Fechar
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Nova Automação</h3>
              <Button 
                variant="outline" 
                onClick={() => setShowCreateForm(false)}
              >
                Voltar
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="automation-name">Nome da automação</Label>
                <Input
                  id="automation-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Notificar quando cliente virar lead"
                />
              </div>

              <div>
                <Label htmlFor="trigger-type">Tipo de gatilho</Label>
                <Select value={formData.trigger} onValueChange={(value) => setFormData({ ...formData, trigger: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um gatilho" />
                  </SelectTrigger>
                  <SelectContent>
                    {triggerOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {(formData.trigger === 'card_created_in_list' || formData.trigger === 'card_moved') && (
                <div>
                  <Label htmlFor="source-list">Lista de origem</Label>
                  <Select value={formData.sourceListId} onValueChange={(value) => setFormData({ ...formData, sourceListId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma lista" />
                    </SelectTrigger>
                    <SelectContent>
                      {board.lists.map((list) => (
                        <SelectItem key={list.id} value={list.id}>
                          {list.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {formData.trigger === 'card_moved' && (
                <div>
                  <Label htmlFor="target-list">Lista de destino</Label>
                  <Select value={formData.targetListId} onValueChange={(value) => setFormData({ ...formData, targetListId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma lista" />
                    </SelectTrigger>
                    <SelectContent>
                      {board.lists.map((list) => (
                        <SelectItem key={list.id} value={list.id}>
                          {list.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="webhook-url">URL do Webhook</Label>
                <Input
                  id="webhook-url"
                  value={formData.webhookUrl}
                  onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
                  placeholder="https://exemplo.com/webhook"
                />
                <p className="text-xs text-gray-500 mt-1">
                  O webhook receberá os dados do cartão e da lista em formato JSON.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: !!checked })}
                />
                <Label htmlFor="active">Ativar automação imediatamente</Label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancelar
                </Button>
                <Button 
                  onClick={handleCreateAutomation}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Criar Automação
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
