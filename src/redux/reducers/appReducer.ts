import { CHANGE_MODE , HIDE_LOADER , SHOW_ERROR , SHOW_LOADER, CHANGE_ACCESSABILITY } from "../types";

const initialState = {
    loading: false,
    errorText: '',
    mode: localStorage.mode ? localStorage.mode : 'student',
    accessability: localStorage.accessability ? localStorage.accessability : false
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
        default: return state;
    }
}
