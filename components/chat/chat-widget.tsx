"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Compass, Send, Sparkles, Wand2, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

type ChatRole = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

const WELCOME_MESSAGE =
  "Hi, I'm the Orvix AI assistant. Ask me about our services, pricing, or timelines — or tap a suggestion below to get started.";

const FALLBACK_MESSAGE =
  "Sorry, I'm having trouble connecting right now. Please reach out through our contact page and we'll get back to you shortly.";

const QUICK_CHIPS = [
  {
    label: "Explore Services",
    icon: Compass,
    prompt:
      "What services does Orvix offer? Give me a quick overview of your main categories.",
  },
  {
    label: "Book Kickoff Call",
    icon: CalendarCheck,
    prompt: "I'd like to book a kickoff call. How do I get started?",
  },
  {
    label: "Get Custom Quote",
    icon: Wand2,
    prompt:
      "I want a custom quote for my project. What information do you need from me?",
  },
] as const;

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { id: "welcome", role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = React.useState("");
  const [isStreaming, setIsStreaming] = React.useState(false);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const hasStartedConversation = messages.some(
    (message) => message.role === "user"
  );

  React.useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  React.useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isOpen]);

  React.useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${Math.min(
      textareaRef.current.scrollHeight,
      128
    )}px`;
  }, [input]);

  async function sendMessage(rawText: string) {
    const text = rawText.trim();
    if (!text || isStreaming) return;

    const userMessage: ChatMessage = { id: makeId(), role: "user", content: text };
    const assistantMessage: ChatMessage = {
      id: makeId(),
      role: "assistant",
      content: "",
    };
    const outgoing = [...messages, userMessage];

    setMessages([...outgoing, assistantMessage]);
    setInput("");
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: outgoing.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Request failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        const snapshot = accumulated;
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantMessage.id
              ? { ...message, content: snapshot }
              : message
          )
        );
      }

      if (!accumulated.trim()) throw new Error("Empty response");
    } catch {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantMessage.id
            ? { ...message, content: FALLBACK_MESSAGE }
            : message
        )
      );
    } finally {
      setIsStreaming(false);
    }
  }

  function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-label="Orvix AI chat"
            className="flex h-[min(34rem,calc(100vh-7.5rem))] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/85 shadow-2xl shadow-ink-900/15 backdrop-blur-lg"
          >
            <div className="flex items-center justify-between gap-3 border-b border-ink-100/80 bg-white/70 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-sm shadow-brand-600/30">
                  <Sparkles className="size-4" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold tracking-tight text-ink-900">
                    {siteConfig.name} AI
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-ink-400">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-500 opacity-75" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-accent-500" />
                    </span>
                    Online
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
                className="flex size-8 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-900"
              >
                <X className="size-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  message={message}
                  isStreaming={isStreaming}
                />
              ))}

              {!hasStartedConversation && (
                <div className="flex flex-wrap gap-2 pl-8">
                  {QUICK_CHIPS.map((chip) => {
                    const Icon = chip.icon;
                    return (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => sendMessage(chip.prompt)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3.5 py-2 text-xs font-medium text-ink-700 transition-colors hover:border-brand-400 hover:text-brand-700"
                      >
                        <Icon className="size-3.5" />
                        {chip.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-ink-100/80 bg-white/70 p-3"
            >
              <div className="flex items-end gap-2 rounded-2xl border border-ink-200 bg-white px-3 py-2 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about services, pricing, timelines..."
                  className="max-h-32 flex-1 resize-none bg-transparent py-1.5 text-sm text-ink-900 outline-none placeholder:text-ink-400"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  aria-label="Send message"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-sm shadow-brand-600/30 transition-all hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:hover:brightness-100"
                >
                  <Send className="size-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <span
          aria-hidden
          className="animate-glow-pulse pointer-events-none absolute -inset-1.5 -z-10 rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-accent-400 opacity-60 blur-lg"
        />
        <motion.button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close AI chat" : "Chat with AI"}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="relative flex h-14 items-center rounded-full bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 p-[1.5px] shadow-xl shadow-ink-900/25"
        >
          <span className="flex h-full items-center gap-2.5 rounded-full bg-ink-900 pr-5 pl-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-400 text-white">
              {isOpen ? <X className="size-4" /> : <Sparkles className="size-4" />}
            </span>
            <span className="text-sm font-medium whitespace-nowrap text-white">
              {isOpen ? "Close chat" : "Chat with AI"}
            </span>
          </span>
        </motion.button>
      </div>
    </div>
  );
}

function ChatBubble({
  message,
  isStreaming,
}: {
  message: ChatMessage;
  isStreaming: boolean;
}) {
  const isUser = message.role === "user";
  const isPending = !isUser && message.content === "" && isStreaming;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn("flex items-end gap-2", isUser && "flex-row-reverse")}
    >
      {!isUser && (
        <span className="mb-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500 text-white">
          <Sparkles className="size-3" />
        </span>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
          isUser
            ? "rounded-br-md bg-ink-900 text-white"
            : "rounded-bl-md bg-ink-50 text-ink-800"
        )}
      >
        {isPending ? <TypingDots /> : message.content}
      </div>
    </motion.div>
  );
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="size-1.5 animate-bounce rounded-full bg-ink-400"
          style={{ animationDelay: `${index * 0.15}s` }}
        />
      ))}
    </span>
  );
}
