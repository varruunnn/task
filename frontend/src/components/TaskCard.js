import { useState } from 'react';
import { format } from 'date-fns';
import { useTasks } from '../context/TaskContext';
import TaskForm from './TaskForm';

const statusColors = {
  todo: 'badge-gray',
  'in-progress': 'badge-blue',
  completed: 'badge-green',
};

const priorityColors = {
  low: 'badge-low',
  medium: 'badge-medium',
  high: 'badge-high',
};

const statusLabels = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export default function TaskCard({ task }) {
  const { editTask, removeTask } = useTasks();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleUpdate = async (data) => {
    setSaving(true);
    const result = await editTask(task._id, data);
    setSaving(false);
    if (result.success) setEditing(false);
    return result;
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    await removeTask(task._id);
  };

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== 'completed';

  if (editing) {
    return (
      <div className="task-card editing">
        <TaskForm initial={task} onSubmit={handleUpdate} onCancel={() => setEditing(false)} loading={saving} />
      </div>
    );
  }

  return (
    <div className={`task-card ${task.status === 'completed' ? 'task-done' : ''}`}>
      <div className="task-card-header">
        <div className="task-badges">
          <span className={`badge ${statusColors[task.status]}`}>{statusLabels[task.status]}</span>
          <span className={`badge ${priorityColors[task.priority]}`}>{task.priority}</span>
        </div>
        <div className="task-actions">
          <button className="icon-btn" onClick={() => setEditing(true)} title="Edit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className={`icon-btn ${confirmDelete ? 'icon-btn-danger' : ''}`}
            onClick={handleDelete}
            title={confirmDelete ? 'Click again to confirm' : 'Delete'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      </div>

      <h3 className={`task-title ${task.status === 'completed' ? 'line-through' : ''}`}>{task.title}</h3>

      {task.description && <p className="task-desc">{task.description}</p>}

      <div className="task-meta">
        {task.dueDate && (
          <span className={`task-due ${isOverdue ? 'overdue' : ''}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {isOverdue ? 'Overdue · ' : ''}{format(new Date(task.dueDate), 'MMM d, yyyy')}
          </span>
        )}
        <span className="task-created">
          {format(new Date(task.createdAt), 'MMM d')}
        </span>
      </div>
    </div>
  );
}
