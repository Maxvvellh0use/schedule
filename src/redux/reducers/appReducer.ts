import { HIDE_LOADER , SHOW_ERROR , SHOW_LOADER } from "../types";

const initialState = {
    loading: false,
    errorText: '',
}

export const appReducer = (state = initialState, action: { type: string, payload: boolean | string }) => {
    switch (action.type) {
        case SHOW_LOADER:
            return { loading: true }
        case HIDE_LOADER:
            return { loading: false }
        case SHOW_ERROR:
            return { errorText: action.payload }
        default: return state;
    }
}
