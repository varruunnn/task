import { createContext, useContext, useReducer, useCallback } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../utils/api';
import toast from 'react-hot-toast';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filters: { status: 'all', priority: 'all', sort: '-createdAt', search: '' },
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload, loading: false, error: null };
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) => (t._id === action.payload._id ? action.payload : t)),
      };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((t) => t._id !== action.payload) };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const loadTasks = useCallback(async (params) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await fetchTasks(params);
      dispatch({ type: 'SET_TASKS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
      toast.error('Failed to load tasks');
    }
  }, []);

  const addTask = useCallback(async (data) => {
    try {
      const res = await createTask(data);
      dispatch({ type: 'ADD_TASK', payload: res.data });
      toast.success('Task created');
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Failed to create task';
      toast.error(msg);
      return { success: false, error: msg };
    }
  }, []);

  const editTask = useCallback(async (id, data) => {
    try {
      const res = await updateTask(id, data);
      dispatch({ type: 'UPDATE_TASK', payload: res.data });
      toast.success('Task updated');
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Failed to update task';
      toast.error(msg);
      return { success: false, error: msg };
    }
  }, []);

  const removeTask = useCallback(async (id) => {
    try {
      await deleteTask(id);
      dispatch({ type: 'DELETE_TASK', payload: id });
      toast.success('Task deleted');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  }, []);

  const setFilters = useCallback((filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, []);

  return (
    <TaskContext.Provider value={{ ...state, loadTasks, addTask, editTask, removeTask, setFilters }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within TaskProvider');
  return ctx;
};
