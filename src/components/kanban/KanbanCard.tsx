
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Paperclip, CheckSquare, DollarSign, Edit, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Subtask {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video';
  url: string;
}

interface CustomField {
  id: string;
  name: string;
  value: string;
}

interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  value: number;
  phone?: string;
  date?: string;
  time?: string;
  responsible?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  subtasks: Subtask[];
  attachments: Attachment[];
  tags: string[];
  customFields: CustomField[];
  listId: string;
}

interface KanbanCardProps {
  card: KanbanCard;
  onEdit: (card: KanbanCard) => void;
  onDelete: (cardId: string) => void;
  isDragging?: boolean;
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700'
};

const priorityLabels = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
  urgent: 'Urgente'
};

export function KanbanCard({
  card,
  onEdit,
  onDelete,
  isDragging = false
}: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging
  } = useSortable({
    id: card.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSortableDragging ? 0.5 : 1
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(card);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(card.id);
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const completedSubtasks = card.subtasks?.filter(task => task.completed).length || 0;
  const totalSubtasks = card.subtasks?.length || 0;

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow bg-white group"
    >
      <CardContent className="p-3 space-y-2">
        <div className="flex items-start justify-between">
          <div {...attributes} {...listeners} className="flex-1">
            <h3 className="font-medium text-sm text-gray-900 text-left">
              {card.title}
            </h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleDropdownClick}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border shadow-md z-50">
              <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600 cursor-pointer">
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Prioridade */}
        <div className="w-full">
          <div className={`text-xs px-2 py-1 rounded ${priorityColors[card.priority]} text-left`}>
            {priorityLabels[card.priority]}
          </div>
        </div>

        {/* Valor */}
        <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium flex items-center w-full">
          <DollarSign className="h-4 w-4 mr-1" />
          R$ {card.value.toFixed(2)}
        </div>

        {/* Subtarefas */}
        {totalSubtasks > 0 && (
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center justify-between w-full">
            <div className="flex items-center">
              <CheckSquare className="h-4 w-4 mr-1" />
              {completedSubtasks}/{totalSubtasks} subtarefas
            </div>
            <div className="flex-1 ml-2 bg-blue-200 rounded-full h-1">
              <div 
                className="bg-blue-600 h-1 rounded-full" 
                style={{
                  width: `${totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0}%`
                }} 
              />
            </div>
          </div>
        )}

        {/* Anexos */}
        {card.attachments && card.attachments.length > 0 && (
          <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm flex items-center w-full">
            <Paperclip className="h-4 w-4 mr-1" />
            {card.attachments.length} anexo{card.attachments.length > 1 ? 's' : ''}
          </div>
        )}

        {/* Tags */}
        {card.tags && card.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {card.tags.map((tag, index) => (
              <div 
                key={index} 
                className={`text-xs px-2 py-1 rounded ${tag === 'Agente de IA' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
