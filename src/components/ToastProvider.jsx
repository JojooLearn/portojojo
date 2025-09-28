import React from 'react';
import * as Toast from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';

const ToastProvider = ({ children }) => {
  const { isDarkMode } = useTheme();

  return (
    <Toast.Provider 
      swipeDirection="right"
      duration={4000}
      label="Notification"
    >
      {children}
      <Toast.Viewport className={cn(
        "toast-viewport",
        "fixed top-4 right-4 z-[1000]",
        "flex flex-col gap-3",
        "max-w-[400px] w-full",
        "outline-none"
      )} />
      
      {/* Custom Toast Component */}
      <Toast.Root
        className={cn(
          "toast-root",
          "relative p-4 rounded-lg",
          "border shadow-lg",
          "data-[state=open]:animate-in data-[state=open]:slide-in-from-right-full",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-80",
          "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
          "data-[swipe=end]:animate-out data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
          "data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-all",
          "bg-white dark:bg-dark-card",
          "border-gray-200 dark:border-gray-700",
          "text-dark dark:text-light",
          "theme-transition"
        )}
      >
        <Toast.Title className={cn(
          "toast-title",
          "font-semibold text-lg mb-1",
          "flex items-center justify-between"
        )}>
          
          <Toast.Action asChild altText="Close notification">
            <button className={cn(
              "toast-close",
              "p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700",
              "transition-colors duration-200",
              "text-gray-500 dark:text-gray-400"
            )}>
              <X size={16} />
            </button>
          </Toast.Action>
        </Toast.Title>
        <Toast.Description className={cn(
          "toast-description",
          "text-sm text-gray-600 dark:text-gray-300"
        )} />
        Hi, Selamat datang!
      </Toast.Root>
    </Toast.Provider>
  );
};

// Custom hook untuk menggunakan toast
export const useToast = () => {
  const { isDarkMode } = useTheme();

  const toast = (title, description, status = 'success') => {
    // Ini akan diimplementasikan di komponen yang menggunakan toast
    // Biasanya menggunakan context atau event emitter
    console.log('Toast triggered:', { title, description, status });
  };

  const success = (message, title = 'Sukses!') => {
    toast(title, message, 'success');
  };

  const error = (message, title = 'Error!') => {
    toast(title, message, 'error');
  };

  const warning = (message, title = 'Peringatan!') => {
    toast(title, message, 'warning');
  };

  const info = (message, title = 'Info!') => {
    toast(title, message, 'info');
  };

  return {
    toast,
    success,
    error,
    warning,
    info
  };
};

export default ToastProvider;