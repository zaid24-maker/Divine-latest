import {
  GraduationCap,
  HeartPulse,
  Landmark,
  Plane,
  ShoppingBag,
  TrainFront,
  Utensils,
} from "lucide-react";

const ICONS = {
  school: GraduationCap,
  hospital: HeartPulse,
  metro: TrainFront,
  shopping: ShoppingBag,
  restaurant: Utensils,
  airport: Plane,
  landmark: Landmark,
};

export function NearbyPlaces({ groups }) {
  return (
    <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
      {groups.map((g) => {
        const Icon = ICONS[g.icon];
        return (
          <div key={g.label}>
            <h3 className="flex items-center gap-2 font-sans text-sm font-semibold">
              <Icon className="h-4 w-4 text-gold-dark" aria-hidden />
              {g.label}
            </h3>
            <ul className="mt-2 space-y-1.5">
              {g.places.map((place) => (
                <li
                  key={place.name}
                  className="flex justify-between gap-3 text-sm"
                >
                  <span className="text-ink-soft">{place.name}</span>
                  <span className="shrink-0 text-muted">{place.distance}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
