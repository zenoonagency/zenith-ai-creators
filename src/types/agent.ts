
export interface HttpIntegration {
  id: string
  name: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  url: string
  query?: Record<string, string>
  headers?: Record<string, string>
  body?: string
  when: string // When the agent should perform this action
  requiredData: string[] // What data the agent needs to make the request
}

export interface Agent {
  id: string
  name: string
  description: string
  instructions: string
  personality: 'formal' | 'casual' | 'technical' | 'friendly' | 'professional'
  language: string
  responseStyle: 'concise' | 'detailed' | 'balanced'
  integrations: HttpIntegration[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateAgentData {
  name: string
  description: string
  instructions: string
  personality: 'formal' | 'casual' | 'technical' | 'friendly' | 'professional'
  language: string
  responseStyle: 'concise' | 'detailed' | 'balanced'
  integrations: HttpIntegration[]
}
