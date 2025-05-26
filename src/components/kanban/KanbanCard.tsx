
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Paperclip, CheckSquare, DollarSign, Edit, Trash2 } from 'lucide-react'
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

interface KanbanCardProps {
  card: KanbanCard
  onEdit: (card: KanbanCard) => void
  onDelete: (cardId: string) => void
  isDragging?: boolean
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

export function KanbanCard({ card, onEdit, onDelete, isDragging = false }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSortableDragging ? 0.5 : 1,
  }

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow bg-white"
    >
      <CardContent className="p-3 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-sm text-gray-900 line-clamp-2">
            {card.title}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(card)}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(card.id)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <Badge className={`text-xs px-2 py-1 ${priorityColors[card.priority]}`}>
            {priorityLabels[card.priority]}
          </Badge>

          <div className="flex items-center text-green-600 font-medium text-sm">
            <DollarSign className="h-4 w-4 mr-1" />
            R$ {card.value.toFixed(2)}
          </div>

          {card.subtasks.total > 0 && (
            <div className="flex items-center text-blue-600 text-sm">
              <CheckSquare className="h-4 w-4 mr-1" />
              {card.subtasks.completed}/{card.subtasks.total} subtarefas
              <div className="ml-2 flex-1 bg-blue-100 rounded-full h-1">
                <div 
                  className="bg-blue-600 h-1 rounded-full" 
                  style={{ width: `${(card.subtasks.completed / card.subtasks.total) * 100}%` }}
                />
              </div>
            </div>
          )}

          {card.attachments > 0 && (
            <div className="flex items-center text-blue-600 text-sm">
              <Paperclip className="h-4 w-4 mr-1" />
              {card.attachments} anexo{card.attachments > 1 ? 's' : ''}
            </div>
          )}

          {card.tags.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {card.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className={`text-xs px-2 py-0.5 ${
                    tag === 'Agente de IA' 
                      ? 'bg-orange-100 text-orange-700 border-orange-200' 
                      : 'bg-blue-100 text-blue-700 border-blue-200'
                  }`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
