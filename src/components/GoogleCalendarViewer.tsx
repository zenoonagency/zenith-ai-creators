
import { Calendar as CalendarIcon, Clock, Edit, Trash2, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar';
import { useState } from 'react';
import { GoogleCalendarEventDialog } from './GoogleCalendarEventDialog';

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

export const GoogleCalendarViewer = () => {
  const { events, deleteEvent } = useGoogleCalendar();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState<GoogleEvent | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      try {
        await deleteEvent(eventId);
      } catch (error) {
        console.error('Erro ao excluir evento:', error);
      }
    }
  };

  const handleEditEvent = (event: GoogleEvent) => {
    setEditingEvent(event);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Seus Eventos do Google Calendar
        </h3>
        <Button 
          onClick={() => setShowCreateDialog(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Evento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <Card key={event.id} className="border hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm">{event.summary}</h4>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditEvent(event)}
                    className="h-6 w-6 p-0"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteEvent(event.id!)}
                    className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs">
                  {formatDate(event.start.dateTime)}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Clock className="h-3 w-3" />
                  {formatTime(event.start.dateTime)} - {formatTime(event.end.dateTime)}
                </div>
                {event.description && (
                  <p className="text-xs text-gray-500 line-clamp-2">{event.description}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Nenhum evento encontrado</p>
        </div>
      )}

      <GoogleCalendarEventDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        event={null}
        mode="create"
      />

      <GoogleCalendarEventDialog
        open={!!editingEvent}
        onOpenChange={(open) => !open && setEditingEvent(null)}
        event={editingEvent}
        mode="edit"
      />
    </div>
  );
};
