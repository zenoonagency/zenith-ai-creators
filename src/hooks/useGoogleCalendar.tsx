
import { useState, useEffect } from 'react'

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

declare global {
  interface Window {
    gapi: any
  }
}

export const useGoogleCalendar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState<GoogleEvent[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeGapi = async () => {
      try {
        console.log('Initializing Google Calendar API...')
        
        // Load the GAPI script if not already loaded
        if (!window.gapi) {
          const script = document.createElement('script')
          script.src = 'https://apis.google.com/js/api.js'
          script.onload = () => {
            console.log('GAPI script loaded')
            loadGapi()
          }
          script.onerror = () => {
            console.error('Failed to load GAPI script')
            setError('Falha ao carregar a API do Google')
            setIsLoading(false)
          }
          document.body.appendChild(script)
        } else {
          loadGapi()
        }
      } catch (error) {
        console.error('Error loading GAPI script:', error)
        setError('Erro ao carregar script da API do Google')
        setIsLoading(false)
      }
    }

    const loadGapi = () => {
      console.log('Loading GAPI modules...')
      window.gapi.load('auth2:client', async () => {
        try {
          console.log('Initializing GAPI client...')
          await window.gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: [DISCOVERY_DOC],
            scope: SCOPES
          })

          console.log('GAPI client initialized successfully')
          const authInstance = window.gapi.auth2.getAuthInstance()
          const currentSignedIn = authInstance.isSignedIn.get()
          
          console.log('Current signed in status:', currentSignedIn)
          setIsSignedIn(currentSignedIn)
          setIsLoading(false)
          setError(null)

          authInstance.isSignedIn.listen((signedIn: boolean) => {
            console.log('Sign in status changed:', signedIn)
            setIsSignedIn(signedIn)
            if (signedIn) {
              loadEvents()
            } else {
              setEvents([])
            }
          })

          if (currentSignedIn) {
            console.log('User is already signed in, loading events...')
            loadEvents()
          }
        } catch (error) {
          console.error('Error initializing GAPI:', error)
          setError('Erro na inicialização da API do Google. Verifique as configurações do projeto.')
          setIsLoading(false)
        }
      })
    }

    initializeGapi()
  }, [])

  const signIn = async () => {
    try {
      console.log('Attempting to sign in...')
      const authInstance = window.gapi.auth2.getAuthInstance()
      await authInstance.signIn()
      console.log('Sign in successful')
    } catch (error) {
      console.error('Error signing in:', error)
      setError('Erro ao fazer login. Tente novamente.')
    }
  }

  const signOut = async () => {
    try {
      console.log('Signing out...')
      const authInstance = window.gapi.auth2.getAuthInstance()
      await authInstance.signOut()
      setEvents([])
      console.log('Sign out successful')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const loadEvents = async () => {
    try {
      console.log('Loading calendar events...')
      const response = await window.gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 50,
        orderBy: 'startTime'
      })

      const eventsList = response.result.items || []
      console.log('Events loaded:', eventsList.length, 'events')
      console.log('Events data:', eventsList)
      setEvents(eventsList)
      setError(null)
    } catch (error) {
      console.error('Error loading events:', error)
      setError('Erro ao carregar eventos do calendário')
    }
  }

  const createEvent = async (event: Partial<GoogleEvent>) => {
    try {
      console.log('Creating event:', event)
      await window.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event
      })
      console.log('Event created successfully')
      loadEvents()
    } catch (error) {
      console.error('Error creating event:', error)
      throw error
    }
  }

  const updateEvent = async (eventId: string, event: Partial<GoogleEvent>) => {
    try {
      console.log('Updating event:', eventId, event)
      await window.gapi.client.calendar.events.update({
        calendarId: 'primary',
        eventId,
        resource: event
      })
      console.log('Event updated successfully')
      loadEvents()
    } catch (error) {
      console.error('Error updating event:', error)
      throw error
    }
  }

  const deleteEvent = async (eventId: string) => {
    try {
      console.log('Deleting event:', eventId)
      await window.gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId
      })
      console.log('Event deleted successfully')
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
    error,
    signIn,
    signOut,
    loadEvents,
    createEvent,
    updateEvent,
    deleteEvent
  }
}
