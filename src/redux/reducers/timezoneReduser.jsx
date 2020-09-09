const CHANGE_TIMEZONE = "CHANGE-TIMEZONE";

const initialState = {
    defaultZone: {id: 1, value: 'UTC+2', toCount: +2},
    zones: [
        {id: 1, value: 'UTC−12', toCount: -12},
        {id: 1, value: 'UTC−11', toCount: -11},
        {id: 1, value: 'UTC−10', toCount: -10},
        {id: 1, value: 'UTC−9:30', toCount: -9.5},
        {id: 1, value: 'UTC−9', toCount: -9},
        {id: 1, value: 'UTC−8', toCount: -8},
        {id: 1, value: 'UTC−7', toCount: -7},
        {id: 1, value: 'UTC−6', toCount: -6},
        {id: 1, value: 'UTC−5', toCount: -5},
        {id: 1, value: 'UTC−4', toCount: -4},
        {id: 1, value: 'UTC−3:30', toCount: -3.5},
        {id: 1, value: 'UTC−3', toCount: -3},
        {id: 1, value: 'UTC−2', toCount: -2},
        {id: 1, value: 'UTC−1', toCount: -1},
        {id: 1, value: 'UTC+0', toCount: +0},
        {id: 1, value: 'UTC+1', toCount: +1},
        {id: 1, value: 'UTC+2', toCount: +2},
        {id: 1, value: 'UTC+3', toCount: +3},
        {id: 1, value: 'UTC+3:30', toCount: +3.5},
        {id: 1, value: 'UTC+4', toCount: +4},
        {id: 1, value: 'UTC+4:30', toCount: +4.5},
        {id: 1, value: 'UTC+5', toCount: +5},
        {id: 1, value: 'UTC+5:30', toCount: +5.5},
        {id: 1, value: 'UTC+5:45', toCount: +5.75},
        {id: 1, value: 'UTC+6', toCount: +6},
        {id: 1, value: 'UTC+6:30', toCount: +6.5},
        {id: 1, value: 'UTC+7', toCount: +7},
        {id: 1, value: 'UTC+8:45', toCount: +8.75},
        {id: 1, value: 'UTC+9', toCount: +9},
        {id: 1, value: 'UTC+9:30', toCount: +9.5},
        {id: 1, value: 'UTC+10', toCount: +10},
        {id: 1, value: 'UTC+10:30', toCount: +10.5},
        {id: 1, value: 'UTC+11', toCount: +11},
        {id: 1, value: 'UTC+12', toCount: +12},
        {id: 1, value: 'UTC+12:45', toCount: +12.75},
        {id: 1, value: 'UTC+13', toCount: +13},
        {id: 1, value: 'UTC+14', toCount: +14},
    ],
}

const timezoneReduser = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_TIMEZONE: {
            localStorage.setItem('timezone', action.zone);
            return state;
        }
        default:
            return state;
    }
}

export const changeTimezoneActCreator = (zone) => ({type: CHANGE_TIMEZONE, zone: zone });

export default timezoneReduser;
