import React, { useEffect, useState } from "react";
import { Button, Modal, Avatar, Switch, Typography } from 'antd';
import { DownloadOutlined, SettingOutlined } from '@ant-design/icons';
<<<<<<< HEAD
import { connect, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
=======
import { connect , useSelector } from 'react-redux';
import UserColorSettings from '../UserColorSettings/UserColorSettings'
>>>>>>> 495a147... feat: add modal window to user color settings

import './TopPanel.scss';

import { SystemState } from "../../redux/types";
import { EventData } from "../types";

interface Props {
    allEventsData: EventData[];
}


const TopPanel: React.FC<Props> = () => {

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
        <Button className="settings-btn">Settings <SettingOutlined /> </Button>
      </div>
<<<<<<< HEAD
=======
      <Button className="settings-btn" onClick={() => showModal()}>Settings <SettingOutlined /> </Button>
      <Modal
          title="Settings"
          visible={isShowModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
        <UserColorSettings />
      </Modal>
>>>>>>> 495a147... feat: add modal window to user color settings
    </div>
  )
}

const mapStateToProps = (state: SystemState) => ({
    allEventsData: state.allEventsData,
})

export default connect(mapStateToProps)(TopPanel);
