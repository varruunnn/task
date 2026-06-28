import { useEffect } from 'react';
import { useTaskForm } from '../hooks/useTaskForm';

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

function Field({ label, error, children }) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      {children}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

export default function TaskForm({ initial, onSubmit, onCancel, loading }) {
  const { values, errors, handleChange, handleBlur, submit, reset, setValues } = useTaskForm(initial);

  useEffect(() => {
    if (initial) {
      setValues({
        title: initial.title || '',
        description: initial.description || '',
        status: initial.status || 'todo',
        priority: initial.priority || 'medium',
        dueDate: initial.dueDate ? initial.dueDate.split('T')[0] : '',
      });
    }
  }, [initial]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!submit()) return;
    const payload = { ...values };
    if (!payload.dueDate) payload.dueDate = null;
    const result = await onSubmit(payload);
    if (result?.success) reset();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <Field label="Title *" error={errors.title}>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="What needs to be done?"
          className={errors.title ? 'input error' : 'input'}
        />
      </Field>

      <Field label="Description" error={errors.description}>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Add details..."
          rows={3}
          className={errors.description ? 'input error' : 'input'}
        />
      </Field>

      <div className="form-row">
        <Field label="Status">
          <select name="status" value={values.status} onChange={handleChange} className="input">
            {statusOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>

        <Field label="Priority">
          <select name="priority" value={values.priority} onChange={handleChange} className="input">
            {priorityOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>

        <Field label="Due Date" error={errors.dueDate}>
          <input
            type="date"
            name="dueDate"
            value={values.dueDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.dueDate ? 'input error' : 'input'}
          />
        </Field>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : initial ? 'Save Changes' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}
