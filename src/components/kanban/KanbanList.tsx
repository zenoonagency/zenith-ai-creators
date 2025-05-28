
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, MoreHorizontal } from 'lucide-react'
import { KanbanCard } from './KanbanCard'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

interface KanbanList {
  id: string
  title: string
  cards: KanbanCard[]
  totalValue: number
  color?: string
}

interface KanbanListProps {
  list: KanbanList
  onCreateCard: (listId: string) => void
  onEditCard: (card: KanbanCard) => void
  onDeleteCard: (cardId: string) => void
  onEditList: (list: KanbanList) => void
}

export function KanbanList({ list, onCreateCard, onEditCard, onDeleteCard, onEditList }: KanbanListProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `list-${list.id}`,
  })

  return (
    <div className="min-w-[320px] flex-shrink-0">
      <Card className={`h-fit ${isOver ? 'bg-purple-50 border-purple-200' : ''}`}>
        <CardHeader className="pb-2 px-3 pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {list.color && (
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: list.color }}
                />
              )}
              <CardTitle className="text-sm font-medium text-gray-700">
                {list.title}
              </CardTitle>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => onCreateCard(list.id)}>
                <Plus className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onEditList(list)}>
                    Editar Lista
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            {list.cards.length} cards R$ {list.totalValue.toFixed(2)}
          </p>
        </CardHeader>
        
        <CardContent 
          ref={setNodeRef}
          className="space-y-2 min-h-[200px] px-3 pb-3"
        >
          <SortableContext items={list.cards.map(card => card.id)} strategy={verticalListSortingStrategy}>
            {list.cards.map((card) => (
              <KanbanCard
                key={card.id}
                card={card}
                onEdit={onEditCard}
                onDelete={onDeleteCard}
              />
            ))}
          </SortableContext>
          
          {list.cards.length === 0 && (
            <div className="text-center py-6 text-gray-400 text-sm">
              Lista vazia
            </div>
          )}
          
          <Button 
            variant="outline" 
            className="w-full border-dashed text-gray-600 hover:text-purple-600 hover:border-purple-300"
            onClick={() => onCreateCard(list.id)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Card
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
