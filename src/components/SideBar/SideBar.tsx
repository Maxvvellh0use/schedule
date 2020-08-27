import React, { useEffect, useState } from "react";
import { Calendar, Typography } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';

import './SideBar.scss'
import { AnyAaaaRecord } from "dns";

function onPanelChange(value: any, mode: any) {
  console.log(value, mode);
}

const SideBar: React.FC = () => {
  const { Title } = Typography;
  return (
    <ul className="side-bar-content">
      <li className="calendar-container">
        <Calendar fullscreen={false} onPanelChange={onPanelChange} />
      </li>
      <li className="announce-container">
        <Title level={4}>Disc Announce</Title>
        <p>Monotonectally develop visionary benefits vis-a-vis granular data. Completely transform bleeding-edge.</p>
        <ThunderboltOutlined className="announce-icon" style={{ }}/>
      </li>
      
    </ul>
  );
}

export default SideBar;