import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ToastContext = createContext(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((message) => {
    setToast(message);
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => setToast(null), 150);
    }, 3000);
    return () => clearTimeout(timer);
  }, [visible, toast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '50%',
            transform: `translateX(-50%) translateY(${visible ? '0' : '10px'})`,
            zIndex: 9999,
            background: 'hsl(0, 0%, 100%)',
            color: 'hsl(20, 25%, 15%)',
            border: '1px solid hsl(25, 20%, 75%)',
            borderRadius: '0.5rem',
            padding: '0.75rem 1.25rem',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.875rem',
            opacity: visible ? 1 : 0,
            transition: 'opacity 150ms ease, transform 150ms ease',
            pointerEvents: 'none',
          }}
        >
          {toast}
        </div>
      )}
    </ToastContext.Provider>
  );
}
