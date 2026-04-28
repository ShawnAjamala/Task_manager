import { useState, useCallback, useMemo } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'
import { Plus, BarChart3 } from 'lucide-react'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleStatus, stats } = useTasks()
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [filter, setFilter] = useState('all')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredTasks = useMemo(() => {
    if (filter === 'all') return tasks
    return tasks.filter(t => t.status === filter)
  }, [tasks, filter])

  const handleAdd = useCallback(async (taskData) => {
    setIsSubmitting(true)
    addTask(taskData)
    toast.success('Task added')
    setShowForm(false)
    setIsSubmitting(false)
  }, [addTask])

  const handleUpdate = useCallback(async (taskData) => {
    setIsSubmitting(true)
    updateTask({ ...editingTask, ...taskData })
    toast.success('Task updated')
    setEditingTask(null)
    setShowForm(false)
    setIsSubmitting(false)
  }, [updateTask, editingTask])

  const handleDelete = useCallback((id) => {
    if (confirm('Delete this task?')) {
      deleteTask(id)
      toast.success('Task deleted')
    }
  }, [deleteTask])

  const handleToggle = useCallback((id) => {
    toggleStatus(id)
  }, [toggleStatus])

  const openEdit = useCallback((task) => {
    setEditingTask(task)
    setShowForm(true)
  }, [])

  const closeForm = useCallback(() => {
    setShowForm(false)
    setEditingTask(null)
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
        <button onClick={() => setShowForm(true)} className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 flex items-center gap-2 shadow-md">
          <Plus size={18} /> Add Task
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-indigo-50 rounded-xl p-4 text-center">
          <BarChart3 className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-indigo-700">{stats.total}</p>
          <p className="text-sm text-indigo-600">Total</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-700">{stats.pending}</p>
          <p className="text-sm text-amber-600">Pending</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
          <p className="text-sm text-green-600">Completed</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        {['all', 'pending', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 capitalize transition-all ${
              filter === f
                ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {f === 'all' ? 'All' : f === 'pending' ? 'Pending' : 'Completed'}
          </button>
        ))}
      </div>

      <TaskList
        tasks={filteredTasks}
        onEdit={openEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggle}
      />

      {showForm && (
        <TaskForm
          initialTask={editingTask}
          onSubmit={editingTask ? handleUpdate : handleAdd}
          onClose={closeForm}
          isLoading={isSubmitting}
        />
      )}
    </div>
  )
}

export default Dashboard