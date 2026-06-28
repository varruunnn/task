import { useTasks } from '../context/TaskContext';

export default function TaskStats() {
  const { tasks } = useTasks();

  const stats = tasks.reduce(
    (acc, t) => {
      acc.total++;
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    },
    { total: 0, todo: 0, 'in-progress': 0, completed: 0 }
  );

  const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="stats-bar">
      <div className="stat-item">
        <span className="stat-num">{stats.total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat-item">
        <span className="stat-num stat-todo">{stats.todo}</span>
        <span className="stat-label">To Do</span>
      </div>
      <div className="stat-item">
        <span className="stat-num stat-progress">{stats['in-progress']}</span>
        <span className="stat-label">In Progress</span>
      </div>
      <div className="stat-item">
        <span className="stat-num stat-done">{stats.completed}</span>
        <span className="stat-label">Completed</span>
      </div>
      <div className="stat-progress-wrap">
        <div className="stat-progress-track">
          <div className="stat-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="stat-pct">{pct}%</span>
      </div>
    </div>
  );
}
