import { memo } from 'react'
import { Calendar, Edit2, Trash2 } from 'lucide-react'

const TaskItem = memo(({ task, onEdit, onDelete, onToggleStatus }) => {
  const formatDate = (dateString) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }

  return (
    <div className="group bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <input
              type="checkbox"
              checked={task.status === 'completed'}
              onChange={() => onToggleStatus(task.id)}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
            />
            <h3 className={`font-semibold ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {task.status === 'completed' ? 'Completed' : 'Pending'}
            </span>
          </div>
          {task.description && (
            <p className="text-gray-600 text-sm mt-1 ml-8">{task.description}</p>
          )}
          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1 ml-8">
              <Calendar size={12} />
              <span>Due {formatDate(task.dueDate)}</span>
            </div>
          )}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(task)} className="p-1 text-indigo-600 hover:bg-indigo-50 rounded">
            <Edit2 size={16} />
          </button>
          <button onClick={() => onDelete(task.id)} className="p-1 text-red-500 hover:bg-red-50 rounded">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
})

TaskItem.displayName = 'TaskItem'
export default TaskItem