
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { KanbanList } from './KanbanList'
import { KanbanCard } from './KanbanCard'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface Subtask {
  id: string
  name: string
  description: string
  completed: boolean
}

interface Attachment {
  id: string
  name: string
  type: 'image' | 'document' | 'video'
  url: string
}

interface CustomField {
  id: string
  name: string
  value: string
}

interface KanbanCard {
  id: string
  title: string
  description?: string
  value: number
  phone?: string
  date?: string
  time?: string
  responsible?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  subtasks: Subtask[]
  attachments: Attachment[]
  tags: string[]
  customFields: CustomField[]
  listId: string
}

interface KanbanList {
  id: string
  title: string
  cards: KanbanCard[]
  totalValue: number
  color?: string
}

interface Board {
  id: string
  name: string
  lists: KanbanList[]
}

interface KanbanBoardProps {
  board: Board
  onMoveCard: (cardId: string, fromListId: string, toListId: string) => void
  onCreateList: () => void
  onCreateCard: (listId: string) => void
  onEditCard: (card: KanbanCard) => void
  onDeleteCard: (cardId: string) => void
  onEditList: (list: KanbanList) => void
}

export function KanbanBoard({ 
  board, 
  onMoveCard, 
  onCreateList, 
  onCreateCard, 
  onEditCard, 
  onDeleteCard,
  onEditList
}: KanbanBoardProps) {
  const [activeCard, setActiveCard] = useState<KanbanCard | null>(null)

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const card = board.lists
      .flatMap(list => list.cards)
      .find(card => card.id === active.id)
    
    if (card) {
      setActiveCard(card)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (!over || !activeCard) {
      setActiveCard(null)
      return
    }

    const overId = over.id.toString()
    const activeId = active.id.toString()

    if (overId.startsWith('list-')) {
      const toListId = overId.replace('list-', '')
      const fromListId = activeCard.listId
      
      if (fromListId !== toListId) {
        onMoveCard(activeId, fromListId, toListId)
      }
    }

    setActiveCard(null)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    
    if (!over) return

    const activeId = active.id.toString()
    const overId = over.id.toString()

    if (activeId === overId) return

    if (overId.startsWith('list-')) {
      return
    }

    const activeCard = board.lists.flatMap(list => list.cards).find(card => card.id === activeId)
    const overCard = board.lists.flatMap(list => list.cards).find(card => card.id === overId)

    if (!activeCard || !overCard) return

    if (activeCard.listId !== overCard.listId) {
      onMoveCard(activeId, activeCard.listId, overCard.listId)
    }
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          <SortableContext items={board.lists.map(list => list.id)} strategy={horizontalListSortingStrategy}>
            {board.lists.map((list) => (
              <KanbanList
                key={list.id}
                list={list}
                onCreateCard={onCreateCard}
                onEditCard={onEditCard}
                onDeleteCard={onDeleteCard}
                onEditList={onEditList}
              />
            ))}
          </SortableContext>
          
          <div className="min-w-[320px] flex-shrink-0">
            <Button
              variant="outline"
              className="w-full h-12 border-dashed border-2 border-gray-300 text-gray-600 hover:border-purple-300 hover:text-purple-600"
              onClick={onCreateList}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Lista
            </Button>
          </div>
        </div>

        <DragOverlay>
          {activeCard && (
            <KanbanCard
              card={activeCard}
              onEdit={() => {}}
              onDelete={() => {}}
              isDragging={true}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
