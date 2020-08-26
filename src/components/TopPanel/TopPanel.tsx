import React, { useEffect, useState } from "react";
import { Button, Avatar, Switch, Typography } from 'antd';
import { DownloadOutlined, SettingOutlined } from '@ant-design/icons';

import './TopPanel.scss';

const TopPanel: React.FC = () => {
  return (
    <div className="top-panel">
      <div className="save-container">
        <p>Save schedule as: <a>xlsx</a>, <a>pdf</a> <DownloadOutlined /> </p>
      </div>
      <Button className="settings-btn">Settings <SettingOutlined /> </Button>
    </div>
  )
}

export default TopPanel;