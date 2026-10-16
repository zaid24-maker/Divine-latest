import { cn } from "@/lib/utils";

export function Field({ label, htmlFor, error, hint, children, className }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="label">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-muted">{hint}</p>}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-1 text-xs font-medium text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ className, invalid, ...props }) {
  return (
    <input
      className={cn("field", invalid && "field-error", className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

export function Textarea({ className, invalid, ...props }) {
  return (
    <textarea
      className={cn(
        "field h-auto min-h-[110px] py-2.5",
        invalid && "field-error",
        className,
      )}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

export function Select({ className, children, invalid, ...props }) {
  return (
    <select
      className={cn(
        "field appearance-none bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-9",
        invalid && "field-error",
        className,
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2369706d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
      }}
      aria-invalid={invalid || undefined}
      {...props}
    >
      {children}
    </select>
  );
}
