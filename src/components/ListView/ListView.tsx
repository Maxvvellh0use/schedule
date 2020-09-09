import React from "react";
import { connect } from "react-redux";
import { Timeline } from 'antd';

import { SystemState } from "../../redux/types";
import { EventData } from "../types";

import './ListView.scss'


interface Props {
  allEventsData: EventData[];
}

const ListView: React.FC<Props> = ({ allEventsData }) => {
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


const mapStateToProps = (state: SystemState) => ({
  allEventsData: state.allEventsData,
})

export default connect(mapStateToProps)(ListView);
