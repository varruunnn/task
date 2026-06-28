import { useTasks } from '../context/TaskContext';
import { useEffect, useRef } from 'react';

const statusOptions = ['all', 'todo', 'in-progress', 'completed'];
const priorityOptions = ['all', 'low', 'medium', 'high'];
const sortOptions = [
  { value: '-createdAt', label: 'Newest' },
  { value: 'createdAt', label: 'Oldest' },
  { value: 'dueDate', label: 'Due Date' },
  { value: '-priority', label: 'Priority' },
  { value: 'title', label: 'A → Z' },
];

export default function FilterBar() {
  const { filters, setFilters, loadTasks } = useTasks();
  const debounceRef = useRef(null);

  useEffect(() => {
    const params = {};
    if (filters.status !== 'all') params.status = filters.status;
    if (filters.priority !== 'all') params.priority = filters.priority;
    if (filters.sort) params.sort = filters.sort;
    if (filters.search) params.search = filters.search;
    loadTasks(params);
  }, [filters]);

  const handleSearch = (e) => {
    const val = e.target.value;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setFilters({ search: val }), 350);
  };

  return (
    <div className="filter-bar">
      <div className="search-wrap">
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search tasks..."
          defaultValue={filters.search}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ status: e.target.value })}
          className="filter-select"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s === 'all' ? 'All Status' : s === 'in-progress' ? 'In Progress' : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilters({ priority: e.target.value })}
          className="filter-select"
        >
          {priorityOptions.map((p) => (
            <option key={p} value={p}>
              {p === 'all' ? 'All Priority' : p.charAt(0).toUpperCase() + p.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={(e) => setFilters({ sort: e.target.value })}
          className="filter-select"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
