import React, { useEffect, useState } from "react";
import { Calendar, Typography } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import './SideBar.scss'
import { EventData, RootStateType } from "../types";
import { getTodayEvents } from "./helpers";
import { Link } from "react-router-dom";


const SideBar: React.FC = () => {
  const allEventsData = useSelector<RootStateType, EventData[]>(state => state.allEventsData);
  const { Title, Text } = Typography;
  const todayEvents = allEventsData.length ? getTodayEvents(allEventsData) : undefined;
 
  function onPanelChange(value: any, mode: any) {
    
  }

  const language = useSelector<RootStateType, string>(state => state.app.language);
  const discAnnounce = (language === 'eng') ? 'Plan for today:' : 'План на сегодня:';

  const { Title } = Typography;
  return (
    <ul className="side-bar-content">
      <li className="calendar-container">
        <Calendar fullscreen={false} onPanelChange={onPanelChange} />
      </li>
      <li className="announce-container">
        <List size="small"
          header={
            <div style={{display: "flex", alignItems: 'center'}}>
              <ThunderboltOutlined className="announce-icon" style={{ color: 'green'}} />
              <Title level={4}>{discAnnounce}</Title>
            </div>}
          bordered
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
