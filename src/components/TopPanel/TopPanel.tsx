import React, { useEffect, useState } from "react";
import { Button, Select, Modal, Avatar, Switch, Typography } from 'antd';
import { DownloadOutlined, SettingOutlined } from '@ant-design/icons';
import {connect , useDispatch , useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';

import './TopPanel.scss';

import UserColorSettings from '../UserColorSettings/UserColorSettings'
import { getEventTypes } from './helpers/getEventTypes'
import { SystemState } from "../../redux/types";
import { EventData, RootStateType } from "../types";
import { changeMode } from "../../redux/actions";

interface Props {
    allEventsData: EventData[];
}


const TopPanel: React.FC<Props> = () => {
    const { Option } = Select;
    const dispatch = useDispatch();
    const mode = useSelector<RootStateType, string>(state => state.app.mode);
    const allEventsData = useSelector<Props, EventData[]>(state => state.allEventsData);
    const eventsData = allEventsData.length ? getEventTypes(allEventsData) : [];

    const [isShowModal, setModal] = useState(false);

    const showModal = () => {
        setModal(true);
    };

    const handleCancel = () => {
        setModal(false);
    };

  return (
    <div className="top-panel">
        <div>
            <Select defaultValue={mode}
                    onChange={(value) => dispatch(changeMode(value))}>
                <Option value="student">Student</Option>
                <Option value="mentor">Mentor</Option>
            </Select>
            {
                mode === 'mentor' ?
                    <NavLink to="/task-creator">
                        <Button className="create-task-btn">Create new task + </Button>
                    </NavLink> : null
            }
        </div>
      <div className="right-bar">
        <div className="save-container">
          <p>Save schedule as:
            <a>xlsx</a>,
            <a>pdf</a>
            <DownloadOutlined />
          </p>
        </div>
          <Button className="settings-btn" onClick={() => showModal()}>Settings <SettingOutlined /> </Button>
          <Modal
              style={{top: 20}}
              title="Settings"
              visible={isShowModal}
              onCancel={handleCancel}
              footer={[
                  <Button key="submit" type="primary" onClick={handleCancel}>
                      Close
                  </Button>,
              ]}
          >
              <UserColorSettings eventsData={eventsData}/>
          </Modal>
      </div>
    </div>
  )
}

const mapStateToProps = (state: SystemState) => ({
    allEventsData: state.allEventsData,
})

export default connect(mapStateToProps)(TopPanel);
