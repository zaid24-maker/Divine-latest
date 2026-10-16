/** Deterministic mock "nearby" data derived from the locality. Replace with a places API later. */
export function getNearby(property) {
  const { locality, city } = property.location;
  const seed = property.id
    .split("")
    .reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const km = (base, spread) =>
    `${(base + ((seed * 7) % spread) / 10).toFixed(1)} km`;

  return [
    {
      label: "Schools",
      icon: "school",
      places: [
        { name: `${locality} Public School`, distance: km(0.6, 8) },
        { name: `${city} International Academy`, distance: km(1.4, 10) },
      ],
    },
    {
      label: "Hospitals",
      icon: "hospital",
      places: [
        { name: `${locality} Multispeciality Hospital`, distance: km(1.1, 9) },
        { name: `${city} Heart & Care Centre`, distance: km(2.6, 12) },
      ],
    },
    {
      label: "Metro / Transit",
      icon: "metro",
      places: [{ name: `${locality} Metro Station`, distance: km(0.8, 14) }],
    },
    {
      label: "Shopping",
      icon: "shopping",
      places: [
        { name: `${locality} Central Mall`, distance: km(1.2, 10) },
        { name: "Weekly Farmers Market", distance: km(0.5, 6) },
      ],
    },
    {
      label: "Restaurants",
      icon: "restaurant",
      places: [
        { name: "The Corner Table", distance: km(0.3, 6) },
        { name: "Spice Route Kitchen", distance: km(0.9, 8) },
      ],
    },
    {
      label: "Airport",
      icon: "airport",
      places: [
        {
          name: `${city} International Airport`,
          distance: `${18 + (seed % 22)} km`,
        },
      ],
    },
    {
      label: "Landmarks",
      icon: "landmark",
      places: [{ name: `${locality} Central Park`, distance: km(0.7, 9) }],
    },
  ];
}
