import { Pencil, Trash2, Clock, Flag } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  const priorityColors = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-red-600',
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4">{task.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              statusColors[task.status]
            }`}
          >
            {task.status}
          </span>

          <div className={`flex items-center space-x-1 ${priorityColors[task.priority]}`}>
            <Flag size={16} />
            <span className="text-sm font-medium capitalize">{task.priority}</span>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-gray-500 text-sm">
          <Clock size={16} />
          <span>{new Date(task.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;