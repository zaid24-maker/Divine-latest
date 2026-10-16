"use client";

import { useState } from "react";
import { Download, PhoneCall } from "lucide-react";
import { LeadForm } from "@/components/property/lead-form";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";

export function ProjectActions({ projectId, projectName, developer }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="grid gap-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-emerald font-semibold text-white hover:bg-emerald-dark"
        >
          <PhoneCall className="h-4 w-4" aria-hidden /> Request Callback
        </button>
        <button
          type="button"
          onClick={() =>
            toast(
              `Brochure for ${projectName} will be emailed to you shortly.`,
              "info",
            )
          }
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-line bg-white font-semibold hover:border-ink"
        >
          <Download className="h-4 w-4" aria-hidden /> Download Brochure
        </button>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Request a callback"
      >
        <p className="mb-4 text-sm text-muted">
          The {developer} sales team will call you about {projectName}.
        </p>
        <LeadForm
          mode="callback"
          agentName={`${developer} sales`}
          propertyId={projectId}
          propertyTitle={projectName}
          onDone={() => window.setTimeout(() => setOpen(false), 1600)}
        />
      </Modal>
    </>
  );
}
