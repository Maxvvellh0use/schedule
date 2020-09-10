import { EventData } from "../../types";
import { Store } from "antd/lib/form/interface";
import moment from "moment";
import { urlApi } from "../../../data/const";
import { notification } from "antd";

const dateFormat = 'MMMM DD, YYYY hh:mm:ss';

export const parseFormValuesToEventData = (values: Store): EventData => {
  console.log(values);
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
    course,
    feedback,
  } = values;

  const dateString = `${date.format('MMMM DD, YYYY')} ${time.format('hh:mm:ss')}`;
  const deadlineString = deadlineDate ?
    `${deadlineDate.format('MMMM DD, YYYY')} ${deadlineTime.format('hh:mm:ss')}` :
    '';
  const materialsData = materials ?
    materials.length > 1 ? materials : materials[0] :
    '';

  return {
    _id: 0,
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
      feedback: feedback,
    },
    course: course || '',
  }
}


export const createEvent = async (eventData: EventData) => {
  try {
    const res = await fetch(`${urlApi}/event_create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    console.log(res)
    return res;
  } catch (e) {
    console.error(e)
  }
}

export const createDeadlineEvent = async (eventData: EventData) => {
  const deadlineEvent = { ...eventData, type: 'Deadline', name: `Deadline: ${eventData.name}` };
  deadlineEvent.optional = { ...eventData.optional, deadline: '', date: eventData.optional.deadline }
  console.log(deadlineEvent);
  return await createEvent(deadlineEvent);
}

export const changeEvent = async (id:number, eventData: EventData) => {
  try {
    const res = await fetch(`${urlApi}/update_event/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    console.log(res)
    return res;
  } catch (e) {
    console.error(e)
  }
}

export const openNotification = (res: any, id: number) => {
  if (id) {
    notification.open({
      message: res.ok ? 'Event Successfully Updated' : 'Event Editing Failed',
      description: res.ok
        ? 'Your event successfully updated.'
        : `Your event did not update. Fail status: ${res.status}`
    });
  } else {
    notification.open({
      message: res.ok ? 'Event Successfully Created' : 'Event Creation Failed',
      description: res.ok
        ? 'Your event successfully added to schedule.'
        : `Your event did not add to schedule. Fail status: ${res.status}`
    });
  }
 
}




