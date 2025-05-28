
import { useState } from 'react'
import { Search } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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

interface Board {
  id: string
  name: string
  lists: Array<{
    id: string
    title: string
    cards: KanbanCard[]
  }>
}

interface CardSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  board: Board
  onCardSelect: (card: KanbanCard) => void
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700'
}

const priorityLabels = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
  urgent: 'Urgente'
}

export function CardSearch({ open, onOpenChange, board, onCardSelect }: CardSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const allCards = board.lists.flatMap(list => 
    list.cards.map(card => ({
      ...card,
      listTitle: list.title
    }))
  )

  const filteredCards = allCards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Procurar Cartão</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Digite o nome do cartão ou tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          <div className="overflow-y-auto max-h-96 space-y-2">
            {filteredCards.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                {searchTerm ? 'Nenhum cartão encontrado' : 'Digite para buscar cartões'}
              </p>
            ) : (
              filteredCards.map((card) => (
                <Card 
                  key={card.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    onCardSelect(card)
                    onOpenChange(false)
                  }}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{card.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">Lista: {card.listTitle}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={`text-xs ${priorityColors[card.priority]}`}>
                            {priorityLabels[card.priority]}
                          </Badge>
                          <span className="text-green-600 font-medium text-sm">
                            R$ {card.value.toFixed(2)}
                          </span>
                        </div>
                        {card.tags.length > 0 && (
                          <div className="flex gap-1 mt-2 flex-wrap">
                            {card.tags.map((tag, index) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
