import { CHANGE_MODE , HIDE_LOADER , SHOW_ERROR , SHOW_LOADER } from "../types";

const initialState = {
    loading: false,
    errorText: '',
    mode: 'student',
}

export const appReducer = (state = initialState, action: { type: string, payload: boolean | string }) => {
    switch (action.type) {
        case SHOW_LOADER:
            return Object.assign({...state},{ loading: true })
        case HIDE_LOADER:
            return Object.assign({...state},{ loading: false })
        case SHOW_ERROR:
            return { errorText: action.payload }
        case CHANGE_MODE:
            return Object.assign({...state},{ mode: action.payload })
        default: return state;
    }
}
