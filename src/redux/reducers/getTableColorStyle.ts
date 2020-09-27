import { getTableColorData } from "../helpers/getTableColorData";
import { eventTypesData } from '../consts'
import { GET_TABLE_COLORS } from "../types";

const initialState = getTableColorData(eventTypesData);

export const getTableColorStyle = (state = initialState, action: { type: string}) => {
  switch (action.type) {
    case GET_TABLE_COLORS:
    return getTableColorData(eventTypesData);

      default: return state;
  }
}