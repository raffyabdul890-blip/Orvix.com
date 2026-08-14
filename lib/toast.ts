export type ToastVariant = "success" | "error";

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  message: string;
}

type Listener = (toasts: ToastItem[]) => void;

let toasts: ToastItem[] = [];
const listeners = new Set<Listener>();

function emit() {
  for (const listener of listeners) listener(toasts);
}

function dismissToast(id: string) {
  toasts = toasts.filter((item) => item.id !== id);
  emit();
}

function pushToast(variant: ToastVariant, message: string) {
  const id = Math.random().toString(36).slice(2, 10);
  toasts = [...toasts, { id, variant, message }];
  emit();
  setTimeout(() => dismissToast(id), 4000);
  return id;
}

export const toast = {
  success: (message: string) => pushToast("success", message),
  error: (message: string) => pushToast("error", message),
  dismiss: dismissToast,
};

export function subscribeToasts(listener: Listener) {
  listeners.add(listener);
  listener(toasts);
  return () => {
    listeners.delete(listener);
  };
}

export function getToastSnapshot() {
  return toasts;
}
