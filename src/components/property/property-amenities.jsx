import {
  Baby,
  Car,
  Dumbbell,
  DoorOpen,
  Landmark,
  MoveVertical,
  ShieldCheck,
  Trees,
  Video,
  Waves,
  Zap,
} from "lucide-react";
import { AMENITIES } from "@/data/constants";

export const AMENITY_ICONS = {
  parking: Car,
  pool: Waves,
  gym: Dumbbell,
  security: ShieldCheck,
  garden: Trees,
  balcony: DoorOpen,
  lift: MoveVertical,
  "power-backup": Zap,
  clubhouse: Landmark,
  cctv: Video,
  "play-area": Baby,
  "beach-access": Waves,
  mosque: Landmark,
};

export function PropertyAmenities({ amenities }) {
  const items = AMENITIES.filter((a) => amenities.includes(a.id));
  if (!items.length) return null;
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
      {items.map(({ id, label }) => {
        const Icon = AMENITY_ICONS[id];
        return (
          <li key={id} className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-light text-emerald">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-sm font-medium">{label}</span>
          </li>
        );
      })}
    </ul>
  );
}
