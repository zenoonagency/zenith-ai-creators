
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2, Palette } from 'lucide-react'

interface KanbanList {
  id: string
  title: string
  cards: any[]
  totalValue: number
  color?: string
}

interface EditListDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  list: KanbanList | null
  onEditList: (listId: string, title: string, color: string) => void
  onDeleteList: (listId: string) => void
}

const colorOptions = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#64748b', // slate
]

export function EditListDialog({ open, onOpenChange, list, onEditList, onDeleteList }: EditListDialogProps) {
  const [title, setTitle] = useState(list?.title || '')
  const [selectedColor, setSelectedColor] = useState(list?.color || colorOptions[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && list) {
      onEditList(list.id, title.trim(), selectedColor)
      onOpenChange(false)
    }
  }

  const handleDelete = () => {
    if (list && confirm('Tem certeza que deseja excluir esta lista? Todos os cartões serão perdidos.')) {
      onDeleteList(list.id)
      onOpenChange(false)
    }
  }

  if (!list) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Lista</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="list-title">Nome da Lista</Label>
            <Input
              id="list-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o nome da lista"
              autoFocus
            />
          </div>
          
          <div>
            <Label>Cor da Lista</Label>
            <div className="flex gap-2 mt-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? 'border-gray-400' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDelete}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Excluir Lista
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                Salvar
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
