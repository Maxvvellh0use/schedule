export const GET_EVENTS: string = 'EVENTS_DATA/GET_EVENTS';
export const SHOW_LOADER: string = 'APP/SHOW_LOADER';
export const HIDE_LOADER: string = 'APP/HIDE_LOADER';
export const SHOW_ERROR: string = 'APP/SHOW_ERROR';
export const GET_TABLE_COLORS: string = 'TABLE_COLOR_STYLE/GET_TABLE_COLORS';
export const CHANGE_MODE: string = 'APP/CHANGE_MODE';


export interface SystemState {
   allEventsData: EventData[];
   app: {
       mode: string,
   }
}

export interface EventData {
    _id: number,
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
        notate: string,
        feedback: boolean
    },
    course: string,
}

export interface AppState {
    loading: boolean,
    errorText: string,
    mode: string,
}

export interface initialStateType {
    allEventsData: {
        allEventsData: EventData[],
    },
    app: {
        loading: boolean,
        errorText: string,
        mode: string,
    }
}
