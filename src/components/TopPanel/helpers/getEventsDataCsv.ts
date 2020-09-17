import { EventData } from "../../types";

export const getEventsDataCsv = (event: EventData) => {
    const copyEvent = Object.assign({}, event, {...event.optional});
    delete copyEvent.optional;
    delete copyEvent._id;
    return copyEvent;
}
