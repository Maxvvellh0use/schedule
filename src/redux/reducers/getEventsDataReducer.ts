import { SET_EVENTS_DATA, EventData } from "../types";

const initialState: EventData = {
    id: 1,
    name: '',
    type: '',
    optional: {
        date: '',
        description: '',
        organizer: '',
        place: '',
        materials: '',
        deadline: '',
    },
    course: '',
}

export const setEventsDataReducer = (state = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case SET_EVENTS_DATA:
            return action.payload
        default: return state
    }
}
