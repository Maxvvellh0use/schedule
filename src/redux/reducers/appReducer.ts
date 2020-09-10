import { CHANGE_MODE , HIDE_LOADER , SHOW_ERROR , SHOW_LOADER, CHANGE_ACCESSABILITY, SET_ENGLISH, SET_RUSSIAN } from "../types";

const initialState = {
    loading: false,
    errorText: '',
    mode: localStorage.mode ? localStorage.mode : 'student',
    accessability: localStorage.accessability ? localStorage.accessability === 'true' : false,
    language: localStorage.language ? localStorage.language : 'eng'
}

export const appReducer = (state = initialState, action: { type: string, payload: boolean | string }) => {
    switch (action.type) {
        case SHOW_LOADER:
            return Object.assign({...state},{ loading: true })
        case HIDE_LOADER:
            return Object.assign({...state},{ loading: false })
        case SHOW_ERROR:
            return Object.assign({...state},{ errorText: action.payload })
        case CHANGE_MODE:
            return Object.assign({...state},{ mode: action.payload })
        case CHANGE_ACCESSABILITY:
            return Object.assign({...state},{ accessability: action.payload })
        case SET_ENGLISH:
            return Object.assign({...state},{ language: 'eng' })
        case SET_RUSSIAN:
            return Object.assign({...state},{ language: 'ru' })
        default: return state;
    }
}
