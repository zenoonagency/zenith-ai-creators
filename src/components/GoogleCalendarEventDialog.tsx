
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar';

interface GoogleEvent {
  id?: string;
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone?: string;
  };
  end: {
    dateTime: string;
    timeZone?: string;
  };
}

interface GoogleCalendarEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: GoogleEvent | null;
  mode: 'create' | 'edit';
}

export const GoogleCalendarEventDialog = ({
  open,
  onOpenChange,
  event,
  mode
}: GoogleCalendarEventDialogProps) => {
  const { createEvent, updateEvent } = useGoogleCalendar();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (event && mode === 'edit') {
      setTitle(event.summary);
      setDescription(event.description || '');
      
      const startDateTime = new Date(event.start.dateTime);
      const endDateTime = new Date(event.end.dateTime);
      
      setStartDate(startDateTime.toISOString().split('T')[0]);
      setStartTime(startDateTime.toTimeString().slice(0, 5));
      setEndDate(endDateTime.toISOString().split('T')[0]);
      setEndTime(endDateTime.toTimeString().slice(0, 5));
    } else {
      // Reset form for create mode
      setTitle('');
      setDescription('');
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      setStartDate(tomorrow.toISOString().split('T')[0]);
      setStartTime('09:00');
      setEndDate(tomorrow.toISOString().split('T')[0]);
      setEndTime('10:00');
    }
  }, [event, mode, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !startDate || !startTime || !endDate || !endTime) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);

    try {
      const startDateTime = new Date(`${startDate}T${startTime}:00`);
      const endDateTime = new Date(`${endDate}T${endTime}:00`);

      const eventData = {
        summary: title,
        description,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: 'America/Sao_Paulo'
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: 'America/Sao_Paulo'
        }
      };

      if (mode === 'create') {
        await createEvent(eventData);
      } else if (event?.id) {
        await updateEvent(event.id, eventData);
      }

      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      alert('Erro ao salvar evento. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Criar Novo Evento' : 'Editar Evento'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título do Evento *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título do evento"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite uma descrição (opcional)"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Data de Início *</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="startTime">Hora de Início *</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="endDate">Data de Término *</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="endTime">Hora de Término *</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : mode === 'create' ? 'Criar Evento' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
