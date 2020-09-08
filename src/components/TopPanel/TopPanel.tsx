import React, { useEffect, useState } from "react";
import { Button, Modal, Avatar, Switch, Typography } from 'antd';
import { DownloadOutlined, SettingOutlined } from '@ant-design/icons';
import { connect, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UserColorSettings from '../UserColorSettings/UserColorSettings'
import { getEventTypes } from './helpers/getEventTypes'

import './TopPanel.scss';

import { SystemState } from "../../redux/types";
import { EventData } from "../types";

interface Props {
    allEventsData: EventData[];
}

const TopPanel: React.FC<Props> = () => {

  const allEventsData = useSelector<Props, EventData[]>(state => state.allEventsData);
  const eventsData = allEventsData.length ? getEventTypes(allEventsData) : [];

  const [isShowModal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };

  const handleOk = (e: any) => {
    console.log(e);
    setModal(false);
  };

  const handleCancel = (e: any) => {
    console.log(e);
    setModal(false);
  };

  return (
    <div className="top-panel">
      <NavLink to="/task-creator">
        <Button className="create-task-btn">Create new task + </Button>
      </NavLink>      
      <div className="right-bar">
        <div className="save-container">
          <p>Save schedule as:
            <a>xlsx</a>,
            <a>pdf</a>
            <DownloadOutlined />
          </p>
        </div>
      </div>
      <Button className="settings-btn" onClick={() => showModal()}>Settings <SettingOutlined /> </Button>
      <Modal
          title="Settings"
          visible={isShowModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
        <UserColorSettings eventsData={eventsData}/>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state: SystemState) => ({
  allEventsData: state.allEventsData,
})

export default connect(mapStateToProps)(TopPanel);
