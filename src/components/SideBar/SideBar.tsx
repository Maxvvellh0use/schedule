import React, { useEffect, useState } from "react";
import { Calendar, Typography, List, Row, Col } from 'antd';
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

  const defaultTodayList = [{
      _id: 0,
      name: 'There are no events today',
      course: '',
      type: '',
      optional: {
          date: '',
        description: '',
        organizer: '',
        place: '',
        materials: '',
        deadline: '',
        details: '',
        duration: '',
        result: '',
        notate: '',
        feedback: false,
      },
  }]


  function onSelect(value: moment.Moment) {
        dispatch(setDate(value.format('DD/MM/YYYY')))
  }

  const language = useSelector<RootStateType, string>(state => state.app.language);
  const discAnnounce = (language === 'eng') ? 'Plan for today:' : 'План на сегодня:';

  return (
    <Row className="side-bar-content">
      <Col xs={24} sm={12} md={12} lg={24} xl={24} className="calendar-container">
        <Calendar fullscreen={false} onSelect={onSelect} />
      </Col>
      <Col xs={24} sm={12} md={12} lg={24} xl={24} className="announce-container">
        <List size="small"
          header={
            <div style={{display: "flex", alignItems: 'center'}}>
              <ThunderboltOutlined className="announce-icon" style={{ color: 'green'}} />
              <Title level={4}>{discAnnounce}</Title>
            </div>}
          dataSource={todayEvents?.length ? todayEvents : defaultTodayList}
          renderItem={(event: EventData) =>
            <List.Item>
                {
                    todayEvents?.length ?
                        <Link to={`/task/${event._id}`}>{event.name}</Link> :
                        event.name
                }
            </List.Item>} />
        </Col>
    </Row>
  );
}

export default SideBar;
