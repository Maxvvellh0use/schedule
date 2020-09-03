import { EventData } from "../../types";
import { Store } from "antd/lib/form/interface";
import moment from "moment";
import { urlApi } from "../../../data/const";

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
  const materialsData = materials ?
    materials.length > 1 ? materials : materials[0] :
    '';

  console.log({
    id: 0,
    name,
    type,
    optional: {
      date: dateString || '',
      description: description || '',
      organizer: organizer || '',
      place: place || '',
      materials: materialsData || '',
      deadline: deadlineString || '',
      details: details || '',
      duration: duration ? duration.toString() : '',
      result: result || '',
      notate: notate || '',
    },
    course: course || '',
  })

  return {
    id: 0,
    name,
    type,
    optional: {
      date: dateString || '',
      description: description || '',
      organizer: organizer || '',
      place: place || '',
      materials: materialsData || '',
      deadline: deadlineString || '',
      details: details || '',
      duration: duration ? duration.toString() : '',
      result: result || '',
      notate: notate || '',
    },
    course: course || '',
  }
}


export const createEvent = async (eventData: EventData) => {
  console.log(JSON.stringify(eventData))
  try {
    const res = await fetch(`${urlApi}/event_create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',        
      },
      body: JSON.stringify(eventData),
    });
    console.log(res)
    const data = await res.json();
    console.log(data)    
  } catch (e) {     
    console.log(e)
  }
}

