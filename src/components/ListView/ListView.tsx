import React , { useEffect } from "react";
import { useSelector } from "react-redux";
import { Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

import { isTodayEvent } from "./helpers/isTodayEvent";
import { EventData , RootStateType } from "../types";
import { getItemColor } from "./helpers/getItemColor";
import { scrollEventCoeff , zero } from "./consts";
import { isDeadlineEvent } from "./helpers/isDeadlineEvent";
import { getCorrectDate } from '../TableView/helpers/getCorrectDate';
import { getCorrectTime } from '../TableView/helpers/getCorrectTime';

import './ListView.scss'


const ListView: React.FC = () => {
  const allEventsData = useSelector<RootStateType, EventData[]>(state => state.allEventsData);

  useEffect(() => {
      if (allEventsData.length) {
          const todayEventIndex = allEventsData.findIndex((event) => {
              return isTodayEvent(event.optional.date)
          })
          scrollToTodayEvents(todayEventIndex)
      }
  }, [])

  const scrollToTodayEvents = (todayEventIndex: number) => {
      window.scroll(zero,todayEventIndex * scrollEventCoeff)
  }

  const defaultZone = useSelector<RootStateType, string>(state => state.timezone.defaultZone);
  const activeZone = useSelector<RootStateType, any>(state => state.timezone.activeZone);
  
  const events = allEventsData.map((event) => {
    const date = getCorrectDate(event.optional.date, defaultZone, activeZone);
    const time = getCorrectTime(event.optional.date, defaultZone, activeZone);
    return (
      <Timeline.Item
          color={ getItemColor(event) }
          dot={isDeadlineEvent(event) ? <ClockCircleOutlined className="timeline-clock-icon" /> : ''}
          key={event._id}>
          <Link to={`/task/${event._id}`}>
              { event.optional.date.slice(zero, -9) + " " + event.name }
          </Link>
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
