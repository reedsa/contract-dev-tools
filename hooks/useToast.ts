import { useState } from "react";

export const useToast = () => {
  const [toasts, setToasts] = useState<
    Array<{
      id: string;
      title?: string;
      description?: string;
      variant?: "default" | "destructive";
    }>
  >([]);

  const toast = (props: {
    title?: string;
    description?: string;
    variant?: "default" | "destructive";
  }) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { id, ...props };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return { toast, dismiss, toasts };
};
