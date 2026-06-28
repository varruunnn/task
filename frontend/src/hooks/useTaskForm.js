import { useState } from 'react';

const defaultValues = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: '',
};

const rules = {
  title: (v) => {
    if (!v.trim()) return 'Title is required';
    if (v.trim().length < 3) return 'Title must be at least 3 characters';
    if (v.trim().length > 100) return 'Title cannot exceed 100 characters';
    return '';
  },
  description: (v) => {
    if (v.length > 500) return 'Description cannot exceed 500 characters';
    return '';
  },
  dueDate: (v) => {
    if (v && isNaN(Date.parse(v))) return 'Enter a valid date';
    return '';
  },
};

export function useTaskForm(initial = {}) {
  const [values, setValues] = useState({ ...defaultValues, ...initial });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (fields = values) => {
    const errs = {};
    Object.keys(rules).forEach((key) => {
      const msg = rules[key](fields[key] || '');
      if (msg) errs[key] = msg;
    });
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: rules[name] ? rules[name](value) : '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: rules[name] ? rules[name](value) : '' }));
  };

  const submit = () => {
    const allTouched = Object.keys(defaultValues).reduce((a, k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched);
    const errs = validate();
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const reset = () => {
    setValues({ ...defaultValues, ...initial });
    setErrors({});
    setTouched({});
  };

  return { values, errors, handleChange, handleBlur, submit, reset, setValues };
}
