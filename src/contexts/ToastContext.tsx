'use client';

import { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

interface ToastContextType {
  showSuccess: (summary: string, detail?: string) => void;
  showInfo: (summary: string, detail?: string) => void;
  showWarn: (summary: string, detail?: string) => void;
  showError: (summary: string, detail?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toast = useRef<Toast>(null);

  const showSuccess = (summary: string, detail?: string) => {
    toast.current?.show({
      severity: 'success',
      summary,
      detail,
      life: 3000
    });
  };

  const showInfo = (summary: string, detail?: string) => {
    toast.current?.show({
      severity: 'info',
      summary,
      detail,
      life: 3000
    });
  };

  const showWarn = (summary: string, detail?: string) => {
    toast.current?.show({
      severity: 'warn',
      summary,
      detail,
      life: 3000
    });
  };

  const showError = (summary: string, detail?: string) => {
    toast.current?.show({
      severity: 'error',
      summary,
      detail,
      life: 3000
    });
  };

  return (
    <ToastContext.Provider value={{ showSuccess, showInfo, showWarn, showError }}>
      <Toast ref={toast} position="top-right" />
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
} 