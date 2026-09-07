export const WEEKDAYS = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
export function sortChambers(chambers = []) {
  return [...chambers].sort((a, b) => WEEKDAYS.indexOf(a.day) - WEEKDAYS.indexOf(b.day) || String(a.from).localeCompare(String(b.from)));
}
export function formatTime(time) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(time || ""));
  if (!match) return time || "—";
  const hour = Number(match[1]);
  return `${String(hour % 12 || 12).padStart(2, "0")}:${match[2]} ${hour >= 12 ? "PM" : "AM"}`;
}
