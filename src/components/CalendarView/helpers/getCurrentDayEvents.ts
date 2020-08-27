import { ListTypes , MutableEventData } from "../../types";

export const getCurrentDayEvents = (moment: any, allEventsDataParseDate:
    MutableEventData[]): ListTypes[] => {
    const findEventsDay = allEventsDataParseDate.filter((event) =>
        moment.month() === event.date.getMonth() && moment.date() === event.date.getDay());
    if (findEventsDay.length) {
        return findEventsDay.map((eventDay) => {
            if (eventDay.type === 'Deadline') {
                return {type: 'error' , content: eventDay.name, link: eventDay.description}
            }
            return {type: 'success' , content: eventDay.name, link: eventDay.description}
        })
    }
    return [
        {type: undefined , content: '', link: ''} ,
    ];
}
