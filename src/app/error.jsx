"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonStyles } from "@/components/ui/button";

export default function GlobalError({ reset }) {
  return (
    <div className="container-page py-20">
      <EmptyState
        icon={<AlertTriangle className="h-6 w-6" aria-hidden />}
        title="Something went wrong"
        description="We couldn't load this page. Please try again, or head back to the homepage."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className={buttonStyles({ variant: "dark" })}
            >
              Try again
            </button>
            <Link href="/" className={buttonStyles({ variant: "outline" })}>
              Go home
            </Link>
          </div>
        }
      />
    </div>
  );
}
