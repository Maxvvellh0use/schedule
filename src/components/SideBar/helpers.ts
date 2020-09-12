import { EventData } from "../types";

export const getTodayEvents = (allEvents: EventData[]): EventData[] => {
  const today = new Date().toLocaleDateString();
  return allEvents.filter((event: EventData) => {
    return new Date(event.optional.date).toLocaleDateString() === today;
  })
}