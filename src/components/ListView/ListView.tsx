import React from "react";
import { useSelector } from "react-redux";
import { Timeline } from 'antd';
import { EventData , RootStateType } from "../types";

import './ListView.scss'


const ListView: React.FC = () => {
  const allEventsData = useSelector<RootStateType, EventData[]>(state => state.allEventsData);
  const events = allEventsData.map((event) => {
    return (
      <Timeline.Item
        color={ event.type === "Deadline" ? "red" : "green" }
        key={event._id}>
          <a href={event.optional.description}>
            { event.optional.date.slice(0, -9) + " " + event.name }
          </a>
      </Timeline.Item>
    )
  })

  return (
    <Timeline>
      {events}
    </Timeline>
 )
}

export default ListView;
