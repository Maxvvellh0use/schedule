import { CHANGE_TIMEZONE } from "../types";
import { timeZoneData } from '../consts';

const timezoneReduser = (state = timeZoneData, action:{type:string, zone:string}) => {
    switch(action.type) {
        case CHANGE_TIMEZONE: {
            localStorage.setItem('timezone', action.zone);
            return {...state, activeZone: action.zone};
        }
        default:
            return state;
    }
}

export const changeTimezoneActCreator = (zone:string) => ({type: CHANGE_TIMEZONE, zone: zone });

export default timezoneReduser;
