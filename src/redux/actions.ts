import { GET_EVENTS , HIDE_LOADER , SHOW_LOADER } from "./types";
import { urlApi } from "../data/const";
import { Dispatch } from "redux";

export const showLoader = () => {
    return {
        type: SHOW_LOADER,
    }
}


export const hideLoader = () => {
    return {
        type: HIDE_LOADER,
    }
}

export const getEventsData = () => {
    return async (dispatch: Dispatch) => {
        dispatch(showLoader());
        const res = await fetch(`${urlApi}/events`);
        const data = await res.json();
        dispatch({ type: GET_EVENTS, payload: data});
        dispatch(hideLoader());
    }
}



