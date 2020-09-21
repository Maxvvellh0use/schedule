import { ListTypes , MutableEventData } from "../../types";

export const getCurrentDayEvents = (moment: any, allEventsDataParseDate:
    MutableEventData[]): ListTypes[] => {
    const findEventsDay = allEventsDataParseDate.filter((event) =>
        moment.month() === event.date.getMonth() && moment.date() === event.date.getDate());
    if (findEventsDay.length) {
        return findEventsDay.map((eventDay) => {
            if (eventDay.type === 'Deadline') {
                return {type: 'error' , content: eventDay.name, link: eventDay.description, _id: eventDay._id}
            }
            return {type: 'success' , content: eventDay.name, link: eventDay.description, _id: eventDay._id}
        })
    }
    return [
        {type: undefined , content: '', link: '', _id: 0} ,
    ];
}
