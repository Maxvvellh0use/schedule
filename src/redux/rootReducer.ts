import { combineReducers } from "redux";
import { setEventsDataReducer } from "./reducers/getEventsDataReducer";
import { appReducer } from "./reducers/appReducer";
import { getTableColorStyle } from "./reducers/getTableColorStyle"
import timezoneReducer from "./reducers/timezoneReducer";

export const rootReducer = combineReducers({
    allEventsData: setEventsDataReducer,
    app: appReducer,
    tableColorStyle: getTableColorStyle,
    timezone: timezoneReducer,
});
