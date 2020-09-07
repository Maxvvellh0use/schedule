import React from 'react';
import { Descriptions } from 'antd';

import './TaskDescription.scss'
import { EventData } from '../types';

const TaskDescription: React.FC<{ event: EventData | undefined }> = ({ event }) => {
  const materials = Array.isArray(event?.optional.materials)
    ? event?.optional.materials.map((mat) => <a href={mat} key={mat}>{mat}</a>) 
    : <a href={event?.optional.materials}>{event?.optional.materials}</a>
  return (
    <Descriptions title={event?.name} layout="vertical" bordered>
      <Descriptions.Item label="Course">{event?.course}</Descriptions.Item>
      <Descriptions.Item label="Type">{event?.type}</Descriptions.Item>
      <Descriptions.Item label="Description">
        <a href={event?.optional.description}>{event?.optional.description}</a>
      </Descriptions.Item>
      <Descriptions.Item label="Start" span={1}>{event?.optional.date}</Descriptions.Item>
      <Descriptions.Item label="Deadline" span={1}>{event?.optional.deadline}</Descriptions.Item>
      <Descriptions.Item label="Place" span={1}>{event?.optional.place}</Descriptions.Item>
      <Descriptions.Item label="Organizer">
        <a href={event?.optional.organizer}>{event?.optional.organizer}</a>
      </Descriptions.Item>
      <Descriptions.Item label="Details" span={2}>
        {event?.optional.details}
      </Descriptions.Item>
      <Descriptions.Item label="Duration" span={1}>{event?.optional.duration}</Descriptions.Item>
      <Descriptions.Item label="Result" span={2}>{event?.optional.result}</Descriptions.Item>      
      <Descriptions.Item label="Materials" span={3}>{ materials }</Descriptions.Item>
      <Descriptions.Item label="Notate" span={3}> {event?.optional.notate} </Descriptions.Item>
  </Descriptions>   
)
}

export default TaskDescription;