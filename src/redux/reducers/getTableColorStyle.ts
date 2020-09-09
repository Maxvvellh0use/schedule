import { GET_TABLE_COLORS } from "../types";

const initialState = {
 'Deadline': localStorage['Deadline'] ? JSON.parse(localStorage['Deadline']) : {backgroundColor: '#ffffff', color: '#595959'},
 'Test': localStorage['Test'] ? JSON.parse(localStorage['Test']) : {backgroundColor: '#ffffff', color: '#595959'},
 'Task': localStorage['Task'] ? JSON.parse(localStorage['Task']) : {backgroundColor: '#ffffff', color: '#595959'},
 'Self Education': localStorage['Self Education'] ? JSON.parse(localStorage['Self Education']) : {backgroundColor: '#ffffff', color: '#595959'},
 'Crosscheck': localStorage['Crosscheck'] ? JSON.parse(localStorage['Crosscheck']) : {backgroundColor: '#ffffff', color: '#595959'},
 'Meetup': localStorage['Meetup'] ? JSON.parse(localStorage['Meetup']) : {backgroundColor: '#ffffff', color: '#595959'},
 'YouTube Live': localStorage['YouTube Live'] ? JSON.parse(localStorage['YouTube Live']) : {backgroundColor: '#ffffff', color: '#595959'},
 'Registration': localStorage['Registration'] ? JSON.parse(localStorage['Registration']) : {backgroundColor: '#ffffff', color: '#595959'},
 'Optional lesson': localStorage['Optional lesson'] ? JSON.parse(localStorage['Optional lesson']) : {backgroundColor: '#ffffff', color: '#595959'},
 'Interview': localStorage['Interview'] ? JSON.parse(localStorage['Interview']) : {backgroundColor: '#ffffff', color: '#595959'},
}

export const getTableColorStyle = (state = initialState, action: { type: string}) => {
  switch (action.type) {
    case GET_TABLE_COLORS:
    return {
      'Deadline': localStorage['Deadline'] ? JSON.parse(localStorage['Deadline']) : {backgroundColor: '#ffffff', color: '#595959'},
      'Test': localStorage['Test'] ? JSON.parse(localStorage['Test']) : {backgroundColor: '#ffffff', color: '#595959'},
      'Task': localStorage['Task'] ? JSON.parse(localStorage['Task']) : {backgroundColor: '#ffffff', color: '#595959'},
      'Self Education': localStorage['Self Education'] ? JSON.parse(localStorage['Self Education']) : {backgroundColor: '#ffffff', color: '#595959'},
      'Crosscheck': localStorage['Crosscheck'] ? JSON.parse(localStorage['Crosscheck']) : {backgroundColor: '#ffffff', color: '#595959'},
      'Meetup': localStorage['Meetup'] ? JSON.parse(localStorage['Meetup']) : {backgroundColor: '#ffffff', color: '#595959'},
      'YouTube Live': localStorage['YouTube Live'] ? JSON.parse(localStorage['YouTube Live']) : {backgroundColor: '#ffffff', color: '#595959'},
      'Registration': localStorage['Registration'] ? JSON.parse(localStorage['Registration']) : {backgroundColor: '#ffffff', color: '#595959'},
      'Optional lesson': localStorage['Optional lesson'] ? JSON.parse(localStorage['Optional lesson']) : {backgroundColor: '#ffffff', color: '#595959'},
      'Interview': localStorage['Interview'] ? JSON.parse(localStorage['Interview']) : {backgroundColor: '#ffffff', color: '#595959'},
     }
      default: return state;
  }
}