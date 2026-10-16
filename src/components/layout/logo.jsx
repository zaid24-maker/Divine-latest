import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ variant = "black", className }) {
  // variant="black" → black-text logo  → /darkogo.png
  // variant="white" → white-text logo  → /ogo.png
  const src = variant === "white" ? "/ogo.png" : "/darkogo.png";

  return (
    <Link
      href="/"
      aria-label="Divine Bricks home"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src={src}
        alt="Divine Bricks"
        width={200}
        height={60}
        priority
        className="h-9 w-auto object-contain md:h-11"
      />
    </Link>
  );
}