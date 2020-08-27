import { combineReducers } from "redux";
import { setEventsDataReducer } from "./reducers/getEventsDataReducer";

export const rootReducer = combineReducers({
    allEventsData: setEventsDataReducer,
});
