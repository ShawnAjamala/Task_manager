import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { useAuth } from './AuthContext'

const TaskContext = createContext()

export const useTasks = () => useContext(TaskContext)

export const TaskProvider = ({ children }) => {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`tasks_${user}`)
      setTasks(stored ? JSON.parse(stored) : [])
    } else {
      setTasks([])
    }
    setLoading(false)
  }, [user])

  const saveTasks = useCallback((newTasks) => {
    if (user) {
      localStorage.setItem(`tasks_${user}`, JSON.stringify(newTasks))
      setTasks(newTasks)
    }
  }, [user])

  const addTask = useCallback((taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date().toISOString(),
      status: taskData.status || 'pending'
    }
    saveTasks([...tasks, newTask])
  }, [tasks, saveTasks])

  const updateTask = useCallback((updatedTask) => {
    const updated = tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
    saveTasks(updated)
  }, [tasks, saveTasks])

  const deleteTask = useCallback((taskId) => {
    saveTasks(tasks.filter(t => t.id !== taskId))
  }, [tasks, saveTasks])

  const toggleStatus = useCallback((taskId) => {
    const updated = tasks.map(t =>
      t.id === taskId
        ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' }
        : t
    )
    saveTasks(updated)
  }, [tasks, saveTasks])

  const stats = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => t.status === 'completed').length
  }), [tasks])

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      addTask,
      updateTask,
      deleteTask,
      toggleStatus,
      stats
    }}>
      {children}
    </TaskContext.Provider>
  )
}