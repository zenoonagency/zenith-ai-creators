
import { useState, useEffect, useCallback } from 'react';

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

const CLIENT_ID = '632529926340-rm8d9pfgeu2pk4ghkla3pcmhia89664i.apps.googleusercontent.com';
const API_KEY = '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';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';

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

export const useGoogleCalendar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<GoogleEvent[]>([]);

  const initializeGapi = useCallback(async () => {
    try {
      if (!window.gapi) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://apis.google.com/js/api.js';
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }

      await window.gapi.load('client:auth2', async () => {
        await window.gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [DISCOVERY_DOC],
          scope: SCOPES
        });

        const authInstance = window.gapi.auth2.getAuthInstance();
        setIsSignedIn(authInstance.isSignedIn.get());
        setIsLoading(false);

        authInstance.isSignedIn.listen(setIsSignedIn);
      });
    } catch (error) {
      console.error('Erro ao inicializar Google API:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeGapi();
  }, [initializeGapi]);

  const signIn = async () => {
    try {
      const authInstance = window.gapi.auth2.getAuthInstance();
      await authInstance.signIn();
      loadEvents();
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const signOut = async () => {
    try {
      const authInstance = window.gapi.auth2.getAuthInstance();
      await authInstance.signOut();
      setEvents([]);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const loadEvents = async () => {
    try {
      const response = await window.gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 50,
        orderBy: 'startTime'
      });

      setEvents(response.result.items || []);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    }
  };

  const createEvent = async (event: Omit<GoogleEvent, 'id'>) => {
    try {
      const response = await window.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event
      });

      await loadEvents();
      return response.result;
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      throw error;
    }
  };

  const updateEvent = async (eventId: string, event: Omit<GoogleEvent, 'id'>) => {
    try {
      const response = await window.gapi.client.calendar.events.update({
        calendarId: 'primary',
        eventId,
        resource: event
      });

      await loadEvents();
      return response.result;
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      throw error;
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      await window.gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId
      });

      await loadEvents();
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      loadEvents();
    }
  }, [isSignedIn]);

  return {
    isSignedIn,
    isLoading,
    events,
    signIn,
    signOut,
    createEvent,
    updateEvent,
    deleteEvent,
    loadEvents
  };
};
