
export interface Agent {
  id: string
  name: string
  description: string
  instructions: string
  personality: 'formal' | 'casual' | 'technical' | 'friendly' | 'professional'
  language: string
  responseStyle: 'concise' | 'detailed' | 'balanced'
  knowledge: string[]
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
  knowledge: string[]
}
