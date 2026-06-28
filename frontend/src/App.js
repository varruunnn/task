import { Toaster } from 'react-hot-toast';
import { TaskProvider } from './context/TaskContext';
import Home from './pages/Home';
import './App.css';

function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          <span>Taskr</span>
        </div>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { borderRadius: '8px', fontSize: '14px' },
        }}
      />
      <Header />
      <Home />
    </TaskProvider>
  );
}
