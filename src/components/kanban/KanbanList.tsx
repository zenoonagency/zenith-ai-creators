
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { KanbanCard } from './KanbanCard'

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
}

interface KanbanListProps {
  list: KanbanList
  onCreateCard: (listId: string) => void
  onEditCard: (card: KanbanCard) => void
  onDeleteCard: (cardId: string) => void
}

export function KanbanList({ list, onCreateCard, onEditCard, onDeleteCard }: KanbanListProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `list-${list.id}`,
  })

  return (
    <div className="min-w-[280px] flex-shrink-0">
      <Card className={`h-fit ${isOver ? 'bg-purple-50 border-purple-200' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-700">
              {list.title}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onCreateCard(list.id)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            {list.cards.length} cards R$ {list.totalValue.toFixed(2)}
          </p>
        </CardHeader>
        
        <CardContent 
          ref={setNodeRef}
          className="space-y-3 min-h-[200px]"
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
            <div className="text-center py-8 text-gray-400 text-sm">
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
