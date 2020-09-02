import { EventData , SystemState , GET_EVENTS, CREATE_EVENT } from "../types";

const initialState: SystemState = {
    allEventsData: [],
}

export const setEventsDataReducer = (state = initialState, action: { type: string, payload: EventData[] }) => {
    switch (action.type) {
        case GET_EVENTS:
            return action.payload
        case CREATE_EVENT: 
            return action.payload
        default: return state
    }
}
