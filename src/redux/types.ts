export const SET_EVENTS_DATA: string = 'GET_EVENTS_DATA';

export interface SystemState {
   allEventsData: EventData[];
}

export interface SetEventsData {
    type: typeof SET_EVENTS_DATA;
    payload: SystemState
}

export interface EventData {
    id: number,
    name: string,
    type: string,
    optional: {
        date: string,
        description: string,
        organizer: string,
        place: string,
        materials: string,
        deadline: string
    },
    course: string,
}
