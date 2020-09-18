import { EventData } from "../../types";

export const getTodayEvents = (allEventsData: EventData[]): number => {
    const today = new Date().toLocaleDateString();
    const todayEventIndex = allEventsData.findIndex((event: EventData) => {
        return new Date(event.optional.date).toLocaleDateString() === today;
    })
    return Math.ceil(todayEventIndex / 10);
}
