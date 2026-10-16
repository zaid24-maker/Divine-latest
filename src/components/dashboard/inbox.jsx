"use client";

import { useState } from "react";
import { ArrowLeft, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const time = (iso) =>
  new Date(iso).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  });

export function Inbox({ initial }) {
  const [conversations, setConversations] = useState(initial);
  const [activeId, setActiveId] = useState(initial[0]?.id ?? null);
  const [mobileThread, setMobileThread] = useState(false);
  const [draft, setDraft] = useState("");

  const active = conversations.find((c) => c.id === activeId) ?? null;

  function open(id) {
    setActiveId(id);
    setMobileThread(true);
    setConversations((cs) =>
      cs.map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
    );
  }

  function send(e) {
    e.preventDefault();
    const body = draft.trim();
    if (!body || !active) return;
    setConversations((cs) =>
      cs.map((c) =>
        c.id === active.id
          ? {
              ...c,
              messages: [
                ...c.messages,
                {
                  id: `m-${Date.now()}`,
                  conversationId: c.id,
                  from: "me",
                  body,
                  sentAt: new Date().toISOString(),
                },
              ],
            }
          : c,
      ),
    );
    setDraft("");
  }

  return (
    <div className="grid overflow-hidden rounded-lg border border-line bg-white lg:h-[640px] lg:grid-cols-[320px_1fr]">
      <ul
        className={cn(
          "divide-y divide-line overflow-y-auto border-line lg:block lg:border-r",
          mobileThread ? "hidden" : "block",
        )}
        aria-label="Conversations"
      >
        {conversations.map((c) => {
          const last = c.messages[c.messages.length - 1];
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => open(c.id)}
                aria-current={c.id === activeId}
                className={cn(
                  "flex w-full flex-col gap-1 px-4 py-4 text-left transition-colors",
                  c.id === activeId ? "bg-emerald-light" : "hover:bg-paper",
                )}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="font-semibold">{c.contactName}</span>
                  {c.unread > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald px-1.5 text-[11px] font-bold text-white">
                      {c.unread}
                    </span>
                  )}
                </span>
                <span className="truncate text-xs font-medium text-gold-dark">
                  {c.propertyTitle}
                </span>
                <span className="truncate text-sm text-muted">
                  {last.from === "me" ? "You: " : ""}
                  {last.body}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <section
        className={cn(
          "min-h-[520px] flex-col lg:flex",
          mobileThread ? "flex" : "hidden",
        )}
        aria-label="Conversation"
      >
        {active ? (
          <>
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMobileThread(false)}
                  aria-label="Back to conversations"
                  className="rounded-md p-1.5 hover:bg-sand lg:hidden"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                  <p className="font-semibold">{active.contactName}</p>
                  <p className="text-xs text-muted">
                    Re: {active.propertyTitle}
                  </p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <a
                  href={`tel:${active.contactPhone.replace(/\s/g, "")}`}
                  aria-label={`Call ${active.contactName}`}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-line hover:border-ink"
                >
                  <Phone className="h-4 w-4" />
                </a>
                <a
                  href={`https://wa.me/${active.contactPhone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${active.contactName}`}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-line hover:border-ink"
                >
                  <MessageCircle className="h-4 w-4 text-emerald" />
                </a>
                <a
                  href={`mailto:${active.contactEmail}`}
                  aria-label={`Email ${active.contactName}`}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-line hover:border-ink"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </header>

            <ol
              className="flex-1 space-y-3 overflow-y-auto bg-paper p-4"
              aria-live="polite"
            >
              {active.messages.map((m) => (
                <li
                  key={m.id}
                  className={cn(
                    "flex",
                    m.from === "me" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-3.5 py-2.5 text-sm",
                      m.from === "me"
                        ? "bg-ink text-paper"
                        : "border border-line bg-white",
                    )}
                  >
                    <p>{m.body}</p>
                    <p
                      className={cn(
                        "mt-1 text-[11px]",
                        m.from === "me" ? "text-paper/60" : "text-muted",
                      )}
                    >
                      {time(m.sentAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <form
              onSubmit={send}
              className="flex gap-2 border-t border-line p-3"
            >
              <label htmlFor="reply" className="sr-only">
                Reply
              </label>
              <input
                id="reply"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Write a reply…"
                className="field flex-1"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="inline-flex h-11 items-center gap-2 rounded-md bg-emerald px-4 text-sm font-semibold text-white hover:bg-emerald-dark disabled:opacity-50"
              >
                <Send className="h-4 w-4" aria-hidden /> Send
              </button>
            </form>
          </>
        ) : (
          <p className="m-auto text-sm text-muted">
            Select a conversation to read it.
          </p>
        )}
      </section>
    </div>
  );
}
