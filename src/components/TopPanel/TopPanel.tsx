import React, { useEffect, useState } from "react";
import { Button, Avatar, Switch, Typography } from 'antd';
import { DownloadOutlined, SettingOutlined } from '@ant-design/icons';
import { connect , useSelector } from 'react-redux';
import { CSVLink, CSVDownload } from "react-csv";

import './TopPanel.scss';

import { SystemState } from "../../redux/types";
import { EventData } from "../types";
import {getEventsDataForCsv} from "./helpers/getEventsDataForCsv";

interface Props {
    allEventsData: EventData[];
}


const TopPanel: React.FC<Props> = ({allEventsData}) => {
    const csvData = getEventsDataForCsv(allEventsData);
  return (
    <div className="top-panel">
      <div className="save-container">
          <p>Save schedule as:
              <a> xlsx</a>,
              <CSVLink data={csvData} separator={"  "}> .csv</CSVLink>
              <DownloadOutlined /> </p>
      </div>
      <Button className="settings-btn">Settings <SettingOutlined /> </Button>
    </div>
  )
}

const mapStateToProps = (state: SystemState) => ({
    allEventsData: state.allEventsData,
})

export default connect(mapStateToProps)(TopPanel);
