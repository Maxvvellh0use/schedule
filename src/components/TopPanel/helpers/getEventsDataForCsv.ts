import { EventData } from "../../types";
import { emptyEventsData } from "../consts";

export const getEventsDataForCsv = (allEventsData: EventData[]) => {
    const copyEventsData = allEventsData.length ? allEventsData.slice() : emptyEventsData;
    return copyEventsData.map((event) => {
        return Object.assign({}, {...event.optional})
    });
}
