
export interface Subtask {
  id: string
  name: string
  description: string
  completed: boolean
}

export interface Attachment {
  id: string
  name: string
  type: 'image' | 'document' | 'video'
  url: string
}

export interface CustomField {
  id: string
  name: string
  value: string
}

export interface TagData {
  id: string
  name: string
  color: string
}

export interface KanbanCard {
  id: string
  title: string
  description?: string
  value: number
  phone?: string
  date?: string
  time?: string
  responsible?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  subtasks: Subtask[]
  attachments: Attachment[]
  tags: string[]
  customFields: CustomField[]
  listId: string
}

export interface KanbanList {
  id: string
  title: string
  cards: KanbanCard[]
  totalValue: number
  color?: string
}

export interface Board {
  id: string
  name: string
  lists: KanbanList[]
  visibility?: 'everyone' | 'me' | 'specific'
  completedListId?: string
}

export interface Automation {
  id: string
  trigger: string
  sourceListId?: string
  targetListId?: string
  webhookUrl: string
  active: boolean
}
