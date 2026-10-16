import {
  BadgeCheck,
  Crown,
  Sparkles,
  Star,
  UserRound,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TONES = {
  gold: "bg-gold text-ink",
  emerald: "bg-emerald text-white",
  ink: "bg-ink text-paper",
  sand: "bg-sand text-ink",
  outline: "border border-line bg-white text-ink",
  red: "bg-red-50 text-red-700",
};

export function Badge({ tone = "sand", className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[4px] px-2 py-1 text-[11px] font-semibold uppercase leading-none tracking-wide",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function getTrustBadges(p) {
  const icon = "h-3 w-3";
  const badges = [
    p.featured && {
      key: "featured",
      label: "Featured",
      tone: "gold",
      icon: <Star className={icon} />,
    },
    p.verified && {
      key: "verified",
      label: "Verified",
      tone: "emerald",
      icon: <BadgeCheck className={icon} />,
    },
    p.isNew && {
      key: "new",
      label: "New",
      tone: "ink",
      icon: <Sparkles className={icon} />,
    },
    p.premium && {
      key: "premium",
      label: "Premium",
      tone: "ink",
      icon: <Crown className={icon} />,
    },
    p.ownerListed && {
      key: "owner",
      label: "Owner Listed",
      tone: "outline",
      icon: <UserRound className={icon} />,
    },
    p.licensed && {
      key: "licensed",
      label: "Licensed",
      tone: "outline",
      icon: <ShieldCheck className={icon} />,
    },
  ];
  return badges.filter((b) => Boolean(b));
}

export function PropertyBadges({ property, max = 3, className }) {
  const badges = getTrustBadges(property).slice(0, max);
  if (!badges.length) return null;
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {badges.map((b) => (
        <Badge key={b.key} tone={b.tone}>
          {b.icon}
          {b.label}
        </Badge>
      ))}
    </div>
  );
}

export function VerifiedMark({ label = "Verified", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-semibold text-emerald",
        className,
      )}
    >
      <BadgeCheck className="h-4 w-4" aria-hidden />
      {label}
    </span>
  );
}
