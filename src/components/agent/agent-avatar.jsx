import { cn, initials } from "@/lib/utils";

/** Initials avatar. No stock portraits are bundled, so agents never get a mismatched face. */
export function AgentAvatar({ name, size = "md", className }) {
  const sizes = {
    sm: "h-9 w-9 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-lg",
    xl: "h-24 w-24 text-2xl",
  };
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-ink font-display font-semibold text-gold",
        sizes[size],
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
