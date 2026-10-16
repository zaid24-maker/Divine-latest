"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, MessageCircle, Phone, PhoneCall, Star } from "lucide-react";
import { AgentAvatar } from "@/components/agent/agent-avatar";
import { VerifiedMark } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { LeadForm } from "./lead-form";

/** Agent summary + direct contact actions + callback dialog. */
export function AgentContactCard({ agent, propertyId, propertyTitle }) {
  const [callback, setCallback] = useState(false);
  const wa = `https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(propertyTitle ? `Hi, I'm interested in "${propertyTitle}" on Divine Bricks.` : "Hi, I found you on Divine Bricks.")}`;
  const action =
    "inline-flex h-11 items-center justify-center gap-2 rounded-md border border-line bg-white text-sm font-semibold transition-colors hover:border-ink";

  return (
    <div>
      <div className="flex items-center gap-4">
        <AgentAvatar name={agent.name} size="lg" />
        <div className="min-w-0">
          <p className="font-display text-xl font-semibold leading-tight">
            {agent.role === "owner" ? (
              agent.name
            ) : (
              <Link
                href={`/agents/${agent.slug}`}
                className="hover:text-emerald"
              >
                {agent.name}
              </Link>
            )}
          </p>
          <p className="truncate text-sm text-muted">
            {agent.role === "owner" ? "Property owner" : agent.company}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            {agent.verified && (
              <VerifiedMark
                label={
                  agent.role === "owner" ? "Verified Owner" : "Verified Agent"
                }
              />
            )}
            <span className="inline-flex items-center gap-1 text-xs text-muted">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden />
              {agent.rating.toFixed(1)} ({agent.reviewCount})
            </span>
          </div>
        </div>
      </div>

      {agent.role !== "owner" && (
        <p className="mt-3 text-xs text-muted">
          {agent.experienceYears} years experience
          {agent.licenseNumber ? ` · License ${agent.licenseNumber}` : ""}
        </p>
      )}

      <div className="mt-4 grid grid-cols-3 gap-2">
        <a href={`tel:${agent.phone.replace(/\s/g, "")}`} className={action}>
          <Phone className="h-4 w-4" aria-hidden /> Call
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className={action}
        >
          <MessageCircle className="h-4 w-4 text-emerald" aria-hidden />{" "}
          WhatsApp
        </a>
        <a href={`mailto:${agent.email}`} className={action}>
          <Mail className="h-4 w-4" aria-hidden /> Email
        </a>
      </div>

      <button
        type="button"
        onClick={() => setCallback(true)}
        className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-sand text-sm font-semibold hover:bg-sand-deep"
      >
        <PhoneCall className="h-4 w-4" aria-hidden /> Request a Callback
      </button>

      <Modal
        open={callback}
        onClose={() => setCallback(false)}
        title="Request a callback"
      >
        <p className="mb-4 text-sm text-muted">
          Leave your details and {agent.name} will call you at a time that suits
          you.
        </p>
        <LeadForm
          mode="callback"
          agentName={agent.name}
          propertyId={propertyId}
          propertyTitle={propertyTitle}
          onDone={() => window.setTimeout(() => setCallback(false), 1600)}
        />
      </Modal>
    </div>
  );
}
