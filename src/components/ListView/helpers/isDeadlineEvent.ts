import { EventData } from "../../types";

const isTodayEvent = (dateNow: Date, dateEvent: Date) => {
    return dateNow.getDate() === dateEvent.getDate() &&
        dateNow.getMonth() === dateEvent.getMonth()
}

export const isPassedEvent = (dateNow: Date, dateEvent: Date) => {
    if (dateNow.getTime() > dateEvent.getTime() && !isTodayEvent(dateNow, dateEvent)) {
        return 'table-row-passed';
    }
}

export const isDeadlineEvent = (eventData: EventData) => {
    const dateNow = new Date(Date.now());
    const dateEvent = new Date(eventData.optional.date);
    return !isTodayEvent(dateNow, dateEvent) && !isPassedEvent(dateNow, dateEvent)
        && eventData.type === 'Deadline';
}
