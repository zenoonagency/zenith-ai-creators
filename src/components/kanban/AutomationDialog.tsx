
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, Plus, Trash2 } from 'lucide-react'

interface KanbanList {
  id: string
  title: string
  cards: any[]
  totalValue: number
  color?: string
}

interface Board {
  id: string
  name: string
  lists: KanbanList[]
}

interface Automation {
  id: string
  trigger: string
  sourceListId?: string
  targetListId?: string
  webhookUrl: string
  active: boolean
}

interface AutomationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  board: Board
  automations: Automation[]
  onCreateAutomation: (automation: Omit<Automation, 'id'>) => void
}

export function AutomationDialog({ open, onOpenChange, board, automations = [], onCreateAutomation }: AutomationDialogProps) {
  const [trigger, setTrigger] = useState('')
  const [sourceListId, setSourceListId] = useState('')
  const [targetListId, setTargetListId] = useState('')
  const [webhookUrl, setWebhookUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (trigger && webhookUrl) {
      onCreateAutomation({
        trigger,
        sourceListId: sourceListId || undefined,
        targetListId: targetListId || undefined,
        webhookUrl,
        active: true
      })
      
      setTrigger('')
      setSourceListId('')
      setTargetListId('')
      setWebhookUrl('')
      onOpenChange(false)
    }
  }

  // Add safety check for board and board.lists
  if (!board || !board.lists) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Criar Automação
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum board disponível</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Criar Automação
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="trigger">Gatilho</Label>
              <Select value={trigger} onValueChange={setTrigger}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um gatilho" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card_created">Cartão criado</SelectItem>
                  <SelectItem value="card_created_in_list">Cartão criado em lista específica</SelectItem>
                  <SelectItem value="card_moved">Cartão movido entre listas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {trigger === 'card_created_in_list' && (
              <div>
                <Label htmlFor="source-list">Lista de origem</Label>
                <Select value={sourceListId} onValueChange={setSourceListId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a lista" />
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

            {trigger === 'card_moved' && (
              <>
                <div>
                  <Label htmlFor="source-list">Lista de origem</Label>
                  <Select value={sourceListId} onValueChange={setSourceListId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a lista de origem" />
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
                <div>
                  <Label htmlFor="target-list">Lista de destino</Label>
                  <Select value={targetListId} onValueChange={setTargetListId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a lista de destino" />
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
              </>
            )}

            <div>
              <Label htmlFor="webhook-url">URL do Webhook</Label>
              <Input
                id="webhook-url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://seu-webhook.com/endpoint"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                Criar Automação
              </Button>
            </div>
          </form>

          {automations.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Automações Existentes</h3>
              <div className="space-y-2">
                {automations.map((automation) => (
                  <Card key={automation.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{automation.trigger}</p>
                          <p className="text-sm text-gray-500">{automation.webhookUrl}</p>
                        </div>
                        <Switch checked={automation.active} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
