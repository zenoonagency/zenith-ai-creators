
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Settings, GripVertical, Users, User, Eye } from 'lucide-react'

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
  visibility?: 'everyone' | 'me' | 'specific'
}

interface BoardConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  board: Board
  onUpdateBoard: (boardId: string, updates: Partial<Board>) => void
}

function SortableListItem({ list }: { list: KanbanList }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 bg-white border rounded-lg"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab hover:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>
      <div className="flex items-center gap-2 flex-1">
        {list.color && (
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: list.color }}
          />
        )}
        <span className="font-medium">{list.title}</span>
        <span className="text-sm text-gray-500">({list.cards.length} cartões)</span>
      </div>
    </div>
  )
}

export function BoardConfigDialog({ open, onOpenChange, board, onUpdateBoard }: BoardConfigDialogProps) {
  const [lists, setLists] = useState(board.lists)
  const [visibility, setVisibility] = useState(board.visibility || 'everyone')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setLists((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleSave = () => {
    onUpdateBoard(board.id, {
      lists,
      visibility
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-purple-600" />
            Configurações do Quadro
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Visibilidade do quadro</h3>
            <RadioGroup value={visibility} onValueChange={setVisibility}>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="everyone" id="everyone" />
                <Users className="h-4 w-4 text-purple-600" />
                <div>
                  <Label htmlFor="everyone" className="font-medium">Visível para todos</Label>
                  <p className="text-sm text-gray-500">Todos os membros da equipe podem ver este quadro</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="me" id="me" />
                <User className="h-4 w-4 text-purple-600" />
                <div>
                  <Label htmlFor="me" className="font-medium">Apenas eu</Label>
                  <p className="text-sm text-gray-500">Somente você poderá ver este quadro</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="specific" id="specific" />
                <Eye className="h-4 w-4 text-purple-600" />
                <div>
                  <Label htmlFor="specific" className="font-medium">Membros específicos</Label>
                  <p className="text-sm text-gray-500">Selecione quem pode ver este quadro</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Ordem das listas</h3>
            <p className="text-sm text-gray-500 mb-4">
              Arraste as listas para reordená-las no quadro
            </p>
            
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={lists.map(l => l.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {lists.map((list) => (
                    <SortableListItem key={list.id} list={list} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Salvar Configurações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
