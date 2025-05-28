
import { useState, useEffect } from 'react'
import { gapi } from 'gapi-script'

const CLIENT_ID = '632529926340-rm8d9pfgeu2pk4ghkla3pcmhia89664i.apps.googleusercontent.com'
const API_KEY = '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'
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
const SCOPES = 'https://www.googleapis.com/auth/calendar'

interface GoogleEvent {
  id: string
  summary: string
  description?: string
  start: {
    dateTime?: string
    date?: string
  }
  end: {
    dateTime?: string
    date?: string
  }
}

export const useGoogleCalendar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState<GoogleEvent[]>([])

  useEffect(() => {
    initializeGapi()
  }, [])

  const initializeGapi = async () => {
    try {
      await gapi.load('auth2:client', async () => {
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [DISCOVERY_DOC],
          scope: SCOPES
        })

        const authInstance = gapi.auth2.getAuthInstance()
        setIsSignedIn(authInstance.isSignedIn.get())
        setIsLoading(false)

        authInstance.isSignedIn.listen(setIsSignedIn)

        if (authInstance.isSignedIn.get()) {
          loadEvents()
        }
      })
    } catch (error) {
      console.error('Error initializing GAPI:', error)
      setIsLoading(false)
    }
  }

  const signIn = async () => {
    try {
      const authInstance = gapi.auth2.getAuthInstance()
      await authInstance.signIn()
      loadEvents()
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  const signOut = async () => {
    try {
      const authInstance = gapi.auth2.getAuthInstance()
      await authInstance.signOut()
      setEvents([])
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const loadEvents = async () => {
    try {
      const response = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 50,
        orderBy: 'startTime'
      })

      setEvents(response.result.items || [])
    } catch (error) {
      console.error('Error loading events:', error)
    }
  }

  const createEvent = async (event: Partial<GoogleEvent>) => {
    try {
      await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event
      })
      loadEvents()
    } catch (error) {
      console.error('Error creating event:', error)
      throw error
    }
  }

  const updateEvent = async (eventId: string, event: Partial<GoogleEvent>) => {
    try {
      await gapi.client.calendar.events.update({
        calendarId: 'primary',
        eventId,
        resource: event
      })
      loadEvents()
    } catch (error) {
      console.error('Error updating event:', error)
      throw error
    }
  }

  const deleteEvent = async (eventId: string) => {
    try {
      await gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId
      })
      loadEvents()
    } catch (error) {
      console.error('Error deleting event:', error)
      throw error
    }
  }

  return {
    isSignedIn,
    isLoading,
    events,
    signIn,
    signOut,
    loadEvents,
    createEvent,
    updateEvent,
    deleteEvent
  }
}
