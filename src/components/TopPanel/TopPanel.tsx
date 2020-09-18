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
import Timezone from "./Timezone/Timezone";

interface Props {
    allEventsData: EventData[];
}

const TopPanel: React.FC<Props> = () => {
    const { Option } = Select;
    const dispatch = useDispatch();
    const mode = useSelector<RootStateType, string>(state => state.app.mode);
    const language = useSelector<RootStateType, string>(state => state.app.language);
    const allEventsData = useSelector<Props, EventData[]>(state => state.allEventsData);
    const accessability = useSelector<RootStateType, boolean>(state => state.app.accessability);
    const eventsData = allEventsData.length ? getEventTypes(allEventsData) : [];

    const [isShowModal, setModal] = useState(false);

    const modeOptionStudent = (language === 'eng') ? 'Student' : 'Студент';
    const modeOptionMentor = (language === 'eng') ? 'Mentor' : 'Ментор';
    const createNewTask = (language === 'eng') ? 'Create new task +' : 'Создать новое задание +';
    const saveSheduleAs = (language === 'eng') ? 'Save shedule as:' : 'Сохранить расписание как:';
    const colorSettingsBtn = (language === 'eng') ? 'Settings' : 'Настройки';
    const closeColorSettingsBtn = (language === 'eng') ? 'Close' : 'Закрыть';

    const showModal = () => {
        setModal(true);
    };

    const handleCancel = () => {
        setModal(false);
    };

  return (
    <div className="top-panel">
        <div className="left-bar">
            <Select
                className="select-mode"
                defaultValue={mode}
                onChange={(value) => dispatch(changeMode(value))}>
                    <Option value="student">{modeOptionStudent}</Option>
                    <Option value="mentor">{modeOptionMentor}</Option>
            </Select>
            {
                mode === 'mentor' ?
                    <NavLink to="/task-creator">
                        <Button className="create-task-btn">{createNewTask}</Button>
                    </NavLink> : null
            }
        </div>
      <div className="right-bar">
        <div className="save-container">
          <p>{saveSheduleAs}
            <a>xlsx</a>,
            <a>pdf</a>
            <DownloadOutlined />
          </p>
        </div>
          <Button className="settings-btn" onClick={() => showModal()}>{colorSettingsBtn}<SettingOutlined /> </Button>
          <Modal
              className={accessability ? 'accessability-on' : ''}
              style={{top: 20}}
              title={colorSettingsBtn}
              visible={isShowModal}
              onCancel={handleCancel}
              footer={[
                  <Button key="submit" type="primary" onClick={handleCancel}>
                      {closeColorSettingsBtn}
                  </Button>,
              ]}
          >
              <UserColorSettings eventsData={eventsData}/>
          </Modal>
        <Timezone/>
      </div>
    </div>
  )
}

const mapStateToProps = (state: SystemState) => ({
    allEventsData: state.allEventsData,
})

export default connect(mapStateToProps)(TopPanel);
