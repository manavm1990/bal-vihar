// Shared types for calendar functionality

export interface CalendarEvent {
  _id: string
  _type: 'calendarEvent'
  title: string
  date: string
  location?: string
  eventType: 'regular' | 'special' | 'celebration' | 'holiday' | 'project'
  time?: string
  description?: string
  isHighlighted: boolean
  academicYear: string
  _createdAt: string
  _updatedAt: string
}

export interface CalendarImport {
  _id: string
  _type: 'calendarImport'
  title: string
  academicYear: string
  uploadedFile: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  status: 'uploaded' | 'processing' | 'completed' | 'error'
  uploadedAt: string
  processedAt?: string
  eventsCount?: number
  notes?: string
  errorLog?: string
  _createdAt: string
  _updatedAt: string
}

// Helper types
export type EventType = CalendarEvent['eventType']
export type ImportStatus = CalendarImport['status']
