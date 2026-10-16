/* Lightweight, dependency-free form validation. Each validator returns a map of field -> message. */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9][0-9\s-]{7,14}$/;

export const isEmail = (v) => EMAIL.test(v.trim());
export const isPhone = (v) => PHONE.test(v.trim());

export function validateLead(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!isPhone(v.phone)) e.phone = "Enter a valid phone number.";
  if (!isEmail(v.email)) e.email = "Enter a valid email address.";
  if (v.message.trim().length > 500)
    e.message = "Message must be 500 characters or fewer.";
  return e;
}

export function validateAuth(v, mode) {
  const e = {};
  if (mode === "register" && (v.name ?? "").trim().length < 2)
    e.name = "Please enter your name.";
  if (!isEmail(v.email)) e.email = "Enter a valid email address.";
  if (v.password.length < 8) e.password = "Use at least 8 characters.";
  return e;
}

export const hasErrors = (e) => Object.keys(e).length > 0;
