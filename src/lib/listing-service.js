/** Mock submission. Replace the body with `fetch("/api/listings", { method: "POST", body })`. */
export async function submitListing(_listing) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  const reference = `DB-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  return { reference, submittedAt: new Date().toISOString() };
}

export async function submitLead(_payload) {
  await new Promise((resolve) => setTimeout(resolve, 600));
}
