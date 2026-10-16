import Image from "next/image";

export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="grid min-h-[calc(100vh-72px)] lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-4xl">{title}</h1>
          <p className="mb-8 mt-2 text-muted">{subtitle}</p>
          {children}
        </div>
      </div>
      <div className="relative hidden bg-ink lg:block">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=75"
          alt=""
          fill
          sizes="50vw"
          className="object-cover opacity-70"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <p className="absolute bottom-12 left-12 right-12 font-display text-3xl leading-snug text-paper">
          &ldquo;Every property listed here is reviewed by a real person before
          it reaches you.&rdquo;
        </p>
      </div>
    </div>
  );
}
