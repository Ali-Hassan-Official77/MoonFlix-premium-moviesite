"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

const ThemeContext = createContext(null);
const ToastContext = createContext(null);

export function Providers({ children }) {
  const [theme, setTheme] = useState("dark");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("moonflix-theme");
    const next = saved === "light" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("moonflix-theme", next);
      return next;
    });
  }, []);

  const notify = useCallback((message, type = "success") => setToast({ id: Date.now(), message, type }), []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return (
    <ThemeContext.Provider value={value}>
      <ToastContext.Provider value={{ notify }}>
        {children}
        {toast && (
          <div className="toast-viewport" role="status" aria-live="polite">
            <div className={`toast-card toast-${toast.type}`}>
              {toast.type === "success" ? <CheckCircle2 /> : toast.type === "warning" ? <AlertTriangle /> : <Info />}
              <span>{toast.message}</span>
              <button onClick={() => setToast(null)} aria-label="Dismiss notification"><X /></button>
            </div>
          </div>
        )}
      </ToastContext.Provider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
export const useToast = () => useContext(ToastContext);
