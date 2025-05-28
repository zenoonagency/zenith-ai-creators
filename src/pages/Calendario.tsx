
import { Calendar } from "lucide-react"
import { GoogleCalendarViewer } from '@/components/GoogleCalendarViewer'
import { GoogleCalendarEventDialog } from '@/components/GoogleCalendarEventDialog'
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const Calendario = () => {
  const [showGoogleEventDialog, setShowGoogleEventDialog] = useState(false)
  const { isSignedIn } = useGoogleCalendar()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Calendário</h1>
        {isSignedIn && (
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowGoogleEventDialog(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Evento
          </Button>
        )}
      </div>

      {/* Google Calendar Integration */}
      <GoogleCalendarViewer />

      {/* Google Calendar Event Dialog */}
      <GoogleCalendarEventDialog 
        open={showGoogleEventDialog}
        onOpenChange={setShowGoogleEventDialog}
      />
    </div>
  )
}

export default Calendario
