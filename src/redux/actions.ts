import {GET_EVENTS , CREATE_EVENT, HIDE_LOADER , SHOW_ERROR , SHOW_LOADER} from "./types";
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

export const showError = () => {
    return {
        type: SHOW_ERROR,
    }
}

export const getEventsData = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(showLoader());
            const res = await fetch(`${urlApi}/events`);
            const data = await res.json();
            dispatch({ type: GET_EVENTS, payload: data});
            dispatch(hideLoader());
        } catch (e) {
            const errorText = `Error request: ${e}`;
            dispatch({ type: SHOW_ERROR, payload: errorText});
        }
    }
}

export const createEvent = (eventData:object) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(showLoader());
            const res = await fetch(`${urlApi}/event_create`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });
            console.log(res)
            const data = await res.json();
            console.log(data)
            dispatch({ type: CREATE_EVENT, payload: data});
            dispatch(hideLoader());
        } catch (e) {
            const errorText = `Error request: ${e}`;
            dispatch({ type: SHOW_ERROR, payload: errorText});
        }
    }
}



