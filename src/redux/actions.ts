import {EventData , SET_EVENTS_DATA , SetEventsData, SystemState} from "./types";

export const setEventsData = (allEventsData: SystemState): SetEventsData => {
    return {
        type: SET_EVENTS_DATA,
        payload: allEventsData,
    }
}
