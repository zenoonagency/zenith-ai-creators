
import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se há um usuário logado no localStorage
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Simular autenticação - em produção, usar uma API real
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const foundUser = users.find((u: any) => u.email === email && u.password === password)
      
      if (foundUser) {
        const userObj = { id: foundUser.id, email: foundUser.email, name: foundUser.name }
        setUser(userObj)
        localStorage.setItem('currentUser', JSON.stringify(userObj))
        return true
      }
      return false
    } catch (error) {
      console.error('Erro no login:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Verificar se o email já existe
      if (users.find((u: any) => u.email === email)) {
        return false
      }
      
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password
      }
      
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      
      const userObj = { id: newUser.id, email: newUser.email, name: newUser.name }
      setUser(userObj)
      localStorage.setItem('currentUser', JSON.stringify(userObj))
      return true
    } catch (error) {
      console.error('Erro no registro:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
