import { EventData, MutableEventData } from "../../types";

export const parseDateEvent = (allEventsData: EventData[]): MutableEventData[] => {
    return allEventsData.map((event) => {
        return {
            date: new Date(event.optional.date),
            name: event.name,
            type: event.type,
            description: event.optional.description,
        };
    });
};
