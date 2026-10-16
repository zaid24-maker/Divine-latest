"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { submitListing } from "@/lib/listing-service";
import { cn } from "@/lib/utils";
import { EMPTY_LISTING, STEPS, validateStep } from "./wizard-model";
import {
  AmenitiesStep,
  CategoryStep,
  ContactStep,
  DescriptionStep,
  DetailsStep,
  ImagesStep,
  LocationStep,
  PreviewStep,
  PurposeStep,
  TypeStep,
} from "./wizard-steps";

const BODIES = {
  purpose: PurposeStep,
  category: CategoryStep,
  type: TypeStep,
  location: LocationStep,
  details: DetailsStep,
  amenities: AmenitiesStep,
  images: ImagesStep,
  description: DescriptionStep,
  contact: ContactStep,
  preview: PreviewStep,
};

export function ListingWizard({ initialPurpose }) {
  const { toast } = useToast();
  const [draft, setDraft] = useState({
    ...EMPTY_LISTING,
    purpose: initialPurpose,
  });
  const [step, setStep] = useState(initialPurpose ? 1 : 0);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const heading = useRef(null);

  const current = STEPS[step];
  const Body = BODIES[current.id];
  const last = step === STEPS.length - 1;

  // Move focus to the step heading so keyboard and screen-reader users land in the right place.
  useEffect(() => {
    heading.current?.focus();
  }, [step, result]);

  const update = (patch) => {
    setDraft((d) => ({ ...d, ...patch }));
    setErrors((e) => {
      const next = { ...e };
      for (const key of Object.keys(patch)) delete next[key];
      return next;
    });
  };

  function next() {
    const found = validateStep(current.id, draft);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function submit() {
    // Re-check every step so nothing slips through if someone jumped around.
    for (let i = 0; i < STEPS.length - 1; i++) {
      const found = validateStep(STEPS[i].id, draft);
      if (Object.keys(found).length) {
        setStep(i);
        setErrors(found);
        toast("Please complete this step before submitting.", "error");
        return;
      }
    }
    setSubmitting(true);
    try {
      setResult(await submitListing(draft));
    } catch {
      toast("We could not submit your listing. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="mx-auto max-w-xl py-10 text-center" role="status">
        <CheckCircle2 className="mx-auto h-16 w-16 text-emerald" aria-hidden />
        <h2 ref={heading} tabIndex={-1} className="mt-5 text-3xl outline-none">
          Your property has been submitted for review.
        </h2>
        <p className="mt-3 text-muted">
          Reference{" "}
          <span className="font-semibold text-ink">{result.reference}</span>.
          Our team usually reviews new listings within one business day, and we
          will email {draft.contactEmail} when it goes live.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/dashboard/properties"
            className={buttonStyles({ variant: "dark" })}
          >
            View my properties
          </Link>
          <Link href="/" className={buttonStyles({ variant: "outline" })}>
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <div className="flex items-baseline justify-between text-sm">
          <p className="font-semibold text-emerald">
            Step {step + 1} of {STEPS.length}
          </p>
          <p className="text-muted">{current.title}</p>
        </div>
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={step + 1}
          aria-label="Listing progress"
          className="mt-2 flex gap-1"
        >
          {STEPS.map((s, i) => (
            <span
              key={s.id}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                i <= step ? "bg-emerald" : "bg-sand-deep",
              )}
            />
          ))}
        </div>
      </div>

      <h2
        ref={heading}
        tabIndex={-1}
        className="mb-6 text-3xl outline-none sm:text-4xl"
      >
        {current.question}
      </h2>

      <Body draft={draft} errors={errors} update={update} />

      <div className="mt-10 flex items-center justify-between gap-3 border-t border-line pt-6">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0 || submitting}
          className={buttonStyles({
            variant: "ghost",
            className: step === 0 ? "invisible" : "",
          })}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back
        </button>
        {last ? (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className={buttonStyles({ variant: "primary", size: "lg" })}
          >
            {submitting && (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            )}
            Submit for review
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className={buttonStyles({ variant: "dark", size: "lg" })}
          >
            Continue <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
}
