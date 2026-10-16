import { cn } from "@/lib/utils";

const VARIANTS = {
  primary: "bg-emerald text-white hover:bg-emerald-dark",
  dark: "bg-ink text-paper hover:bg-ink-soft",
  gold: "bg-gold text-ink hover:bg-gold-dark hover:text-white",
  outline:
    "border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper",
  ghost: "text-ink hover:bg-sand",
  light: "bg-white text-ink hover:bg-sand",
};

const SIZES = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

/** Class string for anything that should look like a button (e.g. a `<Link>`). */
export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-colors",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}
