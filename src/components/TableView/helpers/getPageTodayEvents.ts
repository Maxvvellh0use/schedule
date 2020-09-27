import { EventData } from "../../types";

export const getTodayEvents = (allEventsData: EventData[]): number => {
    const today = new Date().toLocaleDateString();
    const todayEventIndex = allEventsData.findIndex((event: EventData) => {
        return new Date(event.optional.date).toLocaleDateString() === today;
    })
    if (todayEventIndex === -1) {
        return 0;
    }
    return Math.ceil(todayEventIndex / 10);
}
