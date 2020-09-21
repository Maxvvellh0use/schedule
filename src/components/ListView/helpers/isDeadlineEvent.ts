import { EventData } from "../../types";
import { isPassedEvent , isTodayEvent } from "./getItemColor";

export const isDeadlineEvent = (eventData: EventData) => {
    const dateNow = new Date(Date.now());
    const dateEvent = new Date(eventData.optional.date);
    return !isTodayEvent(dateNow, dateEvent) && !isPassedEvent(dateNow, dateEvent)
        && eventData.type === 'Deadline';
}
