import { EventData } from "../../types";
import { Store } from "antd/lib/form/interface";
import moment from "moment";

const dateFormat = 'MMMM DD, YYYY hh:mm:ss';

export const parseFormValuesToEventData = (values: Store
  ): EventData => {
  const {
    date,
    deadlineDate,
    deadlineTime,
    description,
    details,
    duration,
    materials,
    name,
    notate,
    place,
    time,
    type,
    result,
    organizer,
    course
  } = values;

  const dateString = `${date.format('MMMM DD, YYYY')} ${time.format('hh:mm:ss')}`;
  const deadlineString = deadlineDate ?
    `${deadlineDate.format('MMMM DD, YYYY')} ${deadlineTime.format('hh:mm:ss')}` :
    '';

  console.log({
    id: 0,
    name,
    type,
    optional: {
      date: dateString,
      description,
      organizer: organizer,
      place,
      materials: materials.length > 1 ? materials : materials[0],
      deadline: deadlineString,
      details,
      duration: duration.toString(),
      result,
      notate,
    },
    course,
  })

  return {
    id: 0,
    name,
    type,
      optional: {
        date: dateString,
        description,
        organizer: organizer,
        place,
        materials: materials.length > 1 ? materials : materials[0],
        deadline: deadlineString,
        details,
        duration: duration.toString(),
        result,
        notate,
      },
    course,
  }
}

