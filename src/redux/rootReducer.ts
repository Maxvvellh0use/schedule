import { combineReducers } from "redux";
import { setEventsDataReducer } from "./reducers/getEventsDataReducer";
import { appReducer } from "./reducers/appReducer";

export const rootReducer = combineReducers({
    allEventsData: setEventsDataReducer,
    app: appReducer,
});
