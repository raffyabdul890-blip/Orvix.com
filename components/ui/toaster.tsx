"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { getToastSnapshot, subscribeToasts, toast } from "@/lib/toast";

export function Toaster() {
  const toasts = React.useSyncExternalStore(
    subscribeToasts,
    getToastSnapshot,
    getToastSnapshot
  );

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4">
      <AnimatePresence initial={false}>
        {toasts.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "pointer-events-auto flex items-center gap-2.5 rounded-2xl border px-4 py-3 text-sm font-medium shadow-lg backdrop-blur-sm",
              item.variant === "success"
                ? "border-accent-500/20 bg-white/95 text-ink-900 shadow-accent-500/10"
                : "border-red-200 bg-white/95 text-ink-900 shadow-red-500/10"
            )}
          >
            {item.variant === "success" ? (
              <CheckCircle2 className="size-4.5 shrink-0 text-accent-600" />
            ) : (
              <AlertCircle className="size-4.5 shrink-0 text-red-500" />
            )}
            <span>{item.message}</span>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => toast.dismiss(item.id)}
              className="ml-1 flex size-5 shrink-0 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-900"
            >
              <X className="size-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
