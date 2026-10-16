import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function NotFound() {
  return (
    <div className="container-page py-20">
      <EmptyState
        title="Page not found"
        description="The page you are looking for does not exist or has moved."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/properties"
              className={buttonStyles({ variant: "dark" })}
            >
              Browse properties
            </Link>
            <Link href="/" className={buttonStyles({ variant: "outline" })}>
              Go home
            </Link>
          </div>
        }
      />
    </div>
  );
}
