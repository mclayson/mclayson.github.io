export function DaysInMonth (month, year) {
  return new Date(year, month+1, 0).getDate();
}

export function SameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}
