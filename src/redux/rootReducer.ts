import { combineReducers } from "redux";
import { setEventsDataReducer } from "./reducers/getEventsDataReducer";
import { appReducer } from "./reducers/appReducer";
import { getTableColorStyle } from "./reducers/getTableColorStyle"
import timezoneReduser from "./reducers/timezoneReduser";

export const rootReducer = combineReducers({
    allEventsData: setEventsDataReducer,
    app: appReducer,
    tableColorStyle: getTableColorStyle,
    timezone: timezoneReduser,
});
