
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Paperclip, CheckSquare, DollarSign, Edit, Trash2, Eye } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from 'react';
import type { KanbanCard as KanbanCardType } from '@/types/kanban';

interface KanbanCardProps {
  card: KanbanCardType;
  onEdit: (card: KanbanCardType) => void;
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
  const [showDetails, setShowDetails] = useState(false);
  
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
    opacity: isDragging || isSortableDragging ? 0.5 : 1,
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDetails(false);
    onEdit(card);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDetails(false);
    onDelete(card.id);
  };

  const handleView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDetails(true);
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const completedSubtasks = card.subtasks?.completed || 0;
  const totalSubtasks = card.subtasks?.total || 0;

  return (
    <>
      <Card 
        ref={setNodeRef} 
        style={style} 
        className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow bg-white group select-none"
        {...attributes} 
        {...listeners}
      >
        <CardContent className="p-3 space-y-2" style={{ userSelect: 'none' }}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-sm text-gray-900 text-left">
                {card.title}
              </h3>
            </div>
            <div 
              className="flex items-center gap-1"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity" 
                onClick={handleView}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity dropdown-menu-trigger" 
                    onClick={handleDropdownClick}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                  >
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
                <div key={index} className={`text-xs px-2 py-1 rounded ${tag === 'Agente de IA' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                  {tag}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de detalhes */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{card.title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Descrição */}
            {card.description && (
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Descrição</h4>
                <p className="text-sm text-gray-600">{card.description}</p>
              </div>
            )}

            {/* Informações básicas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Valor</h4>
                <div className="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium flex items-center w-fit">
                  <DollarSign className="h-4 w-4 mr-1" />
                  R$ {card.value.toFixed(2)}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Prioridade</h4>
                <div className={`text-xs px-3 py-2 rounded w-fit ${priorityColors[card.priority]}`}>
                  {priorityLabels[card.priority]}
                </div>
              </div>
            </div>

            {/* Telefone */}
            {card.phone && (
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Telefone</h4>
                <p className="text-sm text-gray-600">{card.phone}</p>
              </div>
            )}

            {/* Data e Hora */}
            {(card.date || card.time) && (
              <div className="grid grid-cols-2 gap-4">
                {card.date && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Data</h4>
                    <p className="text-sm text-gray-600">{card.date}</p>
                  </div>
                )}
                {card.time && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Hora</h4>
                    <p className="text-sm text-gray-600">{card.time}</p>
                  </div>
                )}
              </div>
            )}

            {/* Responsável */}
            {card.responsible && (
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Responsável</h4>
                <p className="text-sm text-gray-600">{card.responsible}</p>
              </div>
            )}

            {/* Subtarefas */}
            {totalSubtasks > 0 && (
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Subtarefas</h4>
                <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded text-sm flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckSquare className="h-4 w-4 mr-2" />
                    {completedSubtasks}/{totalSubtasks} concluídas
                  </div>
                  <div className="flex-1 ml-4 bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{
                        width: `${totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0}%`
                      }} 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Anexos */}
            {card.attachments && card.attachments.length > 0 && (
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Anexos</h4>
                <div className="bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm flex items-center">
                  <Paperclip className="h-4 w-4 mr-2" />
                  {card.attachments.length} arquivo{card.attachments.length > 1 ? 's' : ''} anexado{card.attachments.length > 1 ? 's' : ''}
                </div>
              </div>
            )}

            {/* Tags */}
            {card.tags && card.tags.length > 0 && (
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Tags</h4>
                <div className="flex gap-2 flex-wrap">
                  {card.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Botões de ação */}
            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={handleEdit} className="flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
              <Button onClick={handleDelete} variant="destructive" className="flex-1">
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
