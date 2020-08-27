export const GET_EVENTS: string = 'EVENTS_DATA/GET_EVENTS';
export const SHOW_LOADER: string = 'APP/SHOW_LOADER';
export const HIDE_LOADER: string = 'APP/HIDE_LOADER';

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
        deadline: string
    },
    course: string,
}
