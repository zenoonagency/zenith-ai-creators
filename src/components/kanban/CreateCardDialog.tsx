
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface KanbanCard {
  id: string
  title: string
  value: number
  priority: 'low' | 'medium' | 'high' | 'urgent'
  subtasks: { completed: number; total: number }
  attachments: number
  tags: string[]
  listId: string
}

interface CreateCardDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateCard: (card: Omit<KanbanCard, 'id' | 'listId'>) => void
}

export function CreateCardDialog({ open, onOpenChange, onCreateCard }: CreateCardDialogProps) {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('low')
  const [totalSubtasks, setTotalSubtasks] = useState('')
  const [completedSubtasks, setCompletedSubtasks] = useState('')
  const [attachments, setAttachments] = useState('')
  const [tags, setTags] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onCreateCard({
        title: title.trim(),
        value: parseFloat(value) || 0,
        priority,
        subtasks: {
          completed: parseInt(completedSubtasks) || 0,
          total: parseInt(totalSubtasks) || 0
        },
        attachments: parseInt(attachments) || 0,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      })
      
      // Reset form
      setTitle('')
      setValue('')
      setPriority('low')
      setTotalSubtasks('')
      setCompletedSubtasks('')
      setAttachments('')
      setTags('')
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Novo Card</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="card-title">Título do Card</Label>
            <Input
              id="card-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título do card"
              autoFocus
            />
          </div>

          <div>
            <Label htmlFor="card-value">Valor (R$)</Label>
            <Input
              id="card-value"
              type="number"
              step="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div>
            <Label htmlFor="card-priority">Prioridade</Label>
            <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high' | 'urgent') => setPriority(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Baixa</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="urgent">Urgente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="total-subtasks">Total de Subtarefas</Label>
              <Input
                id="total-subtasks"
                type="number"
                value={totalSubtasks}
                onChange={(e) => setTotalSubtasks(e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="completed-subtasks">Subtarefas Concluídas</Label>
              <Input
                id="completed-subtasks"
                type="number"
                value={completedSubtasks}
                onChange={(e) => setCompletedSubtasks(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="attachments">Número de Anexos</Label>
            <Input
              id="attachments"
              type="number"
              value={attachments}
              onChange={(e) => setAttachments(e.target.value)}
              placeholder="0"
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Ex: Marketing, Vendas"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Criar Card
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
