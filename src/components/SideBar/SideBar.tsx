import React, { useEffect, useState } from "react";
import { Calendar, Typography, List, Divider } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from "../../redux/actions";
import { Link } from "react-router-dom";

import './SideBar.scss'
import { EventData, RootStateType } from "../types";
import { getTodayEvents } from "./helpers";
import moment from "moment";


const SideBar: React.FC = () => {
  const allEventsData = useSelector<RootStateType, EventData[]>(state => state.allEventsData);
  const { Title, Text } = Typography;
  const todayEvents = allEventsData.length ? getTodayEvents(allEventsData) : undefined;
  const dispatch = useDispatch();


  function onSelect(value: moment.Moment) {
        dispatch(setDate(value.format('DD.MM.YYYY')))
  }

  const language = useSelector<RootStateType, string>(state => state.app.language);
  const discAnnounce = (language === 'eng') ? 'Plan for today:' : 'План на сегодня:';

  return (
    <ul className="side-bar-content">
      <li className="calendar-container">
        <Calendar fullscreen={false} onSelect={onSelect}/>
      </li>
      <li className="announce-container">
        <List size="small"
          header={
            <div style={{display: "flex", alignItems: 'center'}}>
              <ThunderboltOutlined className="announce-icon" style={{ color: 'green'}} />
              <Title level={4}>{discAnnounce}</Title>
            </div>}
          dataSource={todayEvents}
          renderItem={(event: EventData) =>
            <List.Item>
              <Link to={`/task/${event._id}`}>{event.name}</Link>
            </List.Item>} />
        </li>
    </ul>
  );
}

export default SideBar;
