import { EventData , SystemState , GET_EVENTS } from "../types";

const initialState: SystemState = {
    allEventsData: [],
}

export const setEventsDataReducer = (state = initialState, action: { type: string, payload: EventData[] }) => {
    switch (action.type) {
        case GET_EVENTS:
            return action.payload
        default: return state
    }
}
