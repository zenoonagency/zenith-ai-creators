
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'

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

interface CompletedCardsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  board: Board
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

export function CompletedCards({ open, onOpenChange, board }: CompletedCardsProps) {
  const completedList = board.lists.find(list => 
    list.title.toLowerCase().includes('concluí') || 
    list.title.toLowerCase().includes('finaliz') ||
    list.title.toLowerCase().includes('done')
  )

  const completedCards = completedList?.cards || []
  const totalValue = completedCards.reduce((sum, card) => sum + card.value, 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Lista de Concluídos
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex justify-between items-center">
              <span className="text-green-700 font-medium">
                {completedCards.length} cartões concluídos
              </span>
              <span className="text-green-700 font-bold">
                Valor total: R$ {totalValue.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="overflow-y-auto max-h-96 space-y-3">
            {completedCards.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Nenhum cartão concluído ainda</p>
              </div>
            ) : (
              completedCards.map((card) => (
                <Card key={card.id} className="border border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{card.title}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge className={`text-xs ${priorityColors[card.priority]}`}>
                            {priorityLabels[card.priority]}
                          </Badge>
                          <span className="text-green-600 font-medium">
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
                      <CheckCircle className="h-5 w-5 text-green-600" />
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
