import { createContext, useContext, useState, useEffect } from 'react'
import { getUser, saveUser } from '../utils/localStorage'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('task_manager_current_user')
    if (storedUser) {
      setUser(storedUser)
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    const existingUser = getUser(username)
    if (!existingUser || existingUser.password !== password) {
      throw new Error('Invalid username or password')
    }
    setUser(username)
    setIsAuthenticated(true)
    localStorage.setItem('task_manager_current_user', username)
    toast.success(`Welcome back, ${username}!`)
  }

  const register = async (username, password) => {
    if (getUser(username)) {
      throw new Error('Username already exists')
    }
    saveUser(username, password)
    localStorage.setItem(`tasks_${username}`, JSON.stringify([]))
    toast.success('Account created successfully! Please login.')
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('task_manager_current_user')
    toast.success('Logged out successfully')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}