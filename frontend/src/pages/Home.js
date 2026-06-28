import { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';
import TaskStats from '../components/TaskStats';

export default function Home() {
  const { tasks, loading, error, addTask, filters } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);

  const handleCreate = async (data) => {
    setCreating(true);
    const result = await addTask(data);
    setCreating(false);
    if (result.success) setShowForm(false);
    return result;
  };

  const isEmpty = !loading && tasks.length === 0;
  const hasActiveFilters =
    filters.status !== 'all' || filters.priority !== 'all' || filters.search;

  return (
    <main className="main">
      <div className="container">
        <div className="page-header">
          <div>
            <h1 className="page-title">My Tasks</h1>
            <p className="page-sub">Stay on top of what matters</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowForm((v) => !v)}>
            {showForm ? 'Cancel' : '+ New Task'}
          </button>
        </div>

        {showForm && (
          <div className="create-panel">
            <h2 className="panel-title">New Task</h2>
            <TaskForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} loading={creating} />
          </div>
        )}

        <TaskStats />
        <FilterBar />

        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading tasks...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error-state">
            <p>Something went wrong. Check your connection and try again.</p>
          </div>
        )}

        {isEmpty && !error && (
          <div className="empty-state">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <h3>{hasActiveFilters ? 'No matching tasks' : 'No tasks yet'}</h3>
            <p>{hasActiveFilters ? 'Try adjusting your filters' : 'Create your first task to get started'}</p>
          </div>
        )}

        {!loading && !error && tasks.length > 0 && (
          <div className="task-grid">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
