import React, { useEffect, useState } from "react";
import { Button, Avatar, Switch, Typography } from 'antd';
import { DownloadOutlined, SettingOutlined } from '@ant-design/icons';
import { PDFDownloadLink } from '@react-pdf/renderer';

import './TopPanel.scss';
import TabView from "../TableView/TableView";
import CalendarView from "../CalendarView/CalendarView";

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
