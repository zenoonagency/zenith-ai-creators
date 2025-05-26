
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { KanbanList } from './KanbanList'
import { KanbanCard } from './KanbanCard'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

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
}

export function KanbanBoard({ 
  board, 
  onMoveCard, 
  onCreateList, 
  onCreateCard, 
  onEditCard, 
  onDeleteCard 
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

    // Se soltar em uma lista
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

    // Permitir soltar em listas vazias
    if (overId.startsWith('list-')) {
      return
    }

    // Lógica para reorganizar dentro da mesma lista ou mover entre listas
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
              />
            ))}
          </SortableContext>
          
          <div className="min-w-[280px] flex-shrink-0">
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
