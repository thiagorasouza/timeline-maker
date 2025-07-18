import { addDays, subDays } from "date-fns"

export function getPastDateString(days: number) {
  return subDays(new Date(), days).toISOString().slice(0, 10)
}

export function getFutureDateString(days: number) {
  return addDays(new Date(), days).toISOString().slice(0, 10)
}

export function getPresenteDateString() {
  return new Date().toISOString().slice(0, 10)
}
