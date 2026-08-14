"use client";

import * as React from "react";
import { Loader2, MessageSquare, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import { createClient } from "@/lib/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export interface WorkspaceMessage {
  id: string;
  sender: "user" | "team";
  body: string;
  created_at: string;
}

export function MessagesView({
  userId,
  initialMessages,
}: {
  userId: string;
  initialMessages: WorkspaceMessage[];
}) {
  const [messages, setMessages] = React.useState(initialMessages);
  const [draft, setDraft] = React.useState("");
  const [sending, setSending] = React.useState(false);

  async function handleSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = draft.trim();
    if (!body || sending) return;

    setSending(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("messages")
      .insert({ user_id: userId, sender: "user", body })
      .select("id, sender, body, created_at")
      .single();

    if (!error && data) {
      setMessages((prev) => [...prev, data as WorkspaceMessage]);
      setDraft("");
    } else {
      toast.error("Couldn't send your message. Please try again shortly.");
    }
    setSending(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="min-h-[16rem] rounded-3xl border border-ink-100 bg-white p-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center py-10 text-center">
            <MessageSquare className="size-8 text-ink-200" />
            <p className="mt-4 text-sm leading-relaxed text-ink-600">
              No messages yet — send us one and a strategist will reply here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                    message.sender === "user"
                      ? "rounded-br-md bg-ink-900 text-white"
                      : "rounded-bl-md bg-ink-50 text-ink-800"
                  )}
                >
                  {message.body}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="flex flex-col gap-3">
        <Textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          rows={3}
          placeholder="Write a message to your strategist..."
        />
        <Button
          type="submit"
          variant="brand"
          size="lg"
          disabled={sending || !draft.trim()}
          className="self-end"
        >
          {sending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send
              <Send className="size-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
