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

export const getItemColor = (eventData: EventData): string => {
    const dateNow = new Date(Date.now());
    const dateEvent = new Date(eventData.optional.date);
    if (isPassedEvent(dateNow, dateEvent)) {
        return 'grey';
    } else if (isTodayEvent(dateNow, dateEvent)) {
        return 'blue';
    } else if (!isTodayEvent(dateNow, dateEvent) && !isPassedEvent(dateNow, dateEvent)
        && eventData.type === 'Deadline') {
        return 'red';
    } return 'green'
}
