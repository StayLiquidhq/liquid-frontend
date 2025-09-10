"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, message, type }]);
      window.setTimeout(() => remove(id), 4000);
    },
    [remove]
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 w-[calc(100%-2rem)] max-w-sm"
          role="status"
          aria-live="polite"
        >
          {toasts.map((toast) => {
            const borderColor =
              toast.type === "success"
                ? "#0CBA65"
                : toast.type === "error"
                ? "#FB4E88"
                : "#3086FF";
            return (
              <div
                key={toast.id}
                className="squircle squircle-3xl squircle-smooth-xl squircle-[#1E1E1E] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] text-white px-4 py-3 shadow-lg"
                style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.35)" }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: borderColor }}
                  />
                  <p className="text-sm leading-relaxed text-[#cccccc]">
                    {toast.message}
                  </p>
                  <button
                    aria-label="Close"
                    onClick={() => remove(toast.id)}
                    className="ml-auto text-[#7a7a7a] hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
};
