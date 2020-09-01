import React, { useEffect, useState } from "react";
import { Button, Avatar, Switch, Typography } from 'antd';
import { DownloadOutlined, SettingOutlined } from '@ant-design/icons';
import { connect, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './TopPanel.scss';

import { SystemState } from "../../redux/types";
import { EventData } from "../types";

interface Props {
    allEventsData: EventData[];
}


const TopPanel: React.FC<Props> = () => {
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
    </div>
  )
}

const mapStateToProps = (state: SystemState) => ({
    allEventsData: state.allEventsData,
})

export default connect(mapStateToProps)(TopPanel);
