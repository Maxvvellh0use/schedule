export const GET_EVENTS: string = 'EVENTS_DATA/GET_EVENTS';
export const CREATE_EVENT: string = 'EVENTS_DATA/CREATE_EVENT';
export const SHOW_LOADER: string = 'APP/SHOW_LOADER';
export const HIDE_LOADER: string = 'APP/HIDE_LOADER';
export const SHOW_ERROR: string = 'APP/SHOW_ERROR';

export interface SystemState {
   allEventsData: EventData[];
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
        deadline: string,
        details: string,
        duration: string,
        result: string,
        notate: string
    },
    course: string,
}
