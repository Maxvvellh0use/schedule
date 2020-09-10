import {CHANGE_MODE , CHANGE_THEME , HIDE_LOADER , SHOW_ERROR , SHOW_LOADER} from "../types";

const initialState = {
    loading: false,
    errorText: '',
    mode: localStorage.mode ? localStorage.mode : 'student',
    theme: localStorage.theme ? localStorage.theme : 'light',
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
        case CHANGE_THEME:
            return Object.assign({...state},{ theme: action.payload })
        default: return state;
    }
}
