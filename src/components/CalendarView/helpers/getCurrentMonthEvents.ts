import { MutableEventData , NameEventType } from "../../types";

export const getCurrentMonthEvents = (moment: any, allEventsDataParseDate:
    MutableEventData[]): NameEventType[] => {
    const findEventsMonth = allEventsDataParseDate.filter((event) =>
        moment.month() === event.date.getMonth());
    return findEventsMonth.map((event) => {
        return {
            _id: event._id,
            text: event.name,
            link: event.description,
            type: event.type,
        }
    });
}
