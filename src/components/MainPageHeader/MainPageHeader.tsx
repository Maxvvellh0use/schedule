import React, { useEffect, useState } from "react";
import { Button, Avatar, Switch, Typography, Radio } from 'antd';
import { UserOutlined, EyeTwoTone, EyeInvisibleTwoTone } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setEnglish, setRussian } from '../../redux/actions'

import './MainPageHeader.scss';

import logo from '../../assets/img/logo-rsschool3.png';
import { RootStateType } from "../types";
import { changeAccessability } from "../../redux/actions";


interface State {
  app: {
    language: string
  }
}

const MainPageHeader: React.FC = () => {

  const dispatch = useDispatch();

  const language = useSelector<State, string>(state => state.app.language);
  
  const { Title } = Typography;
  const accessability = useSelector<RootStateType, boolean>(state => state.app.accessability);
  const eyeIconStyle = { 
    fontSize: '1.3rem', 
    color: accessability ? '#290f72' : '#08c' 
  }

  function onThemeChange(checked: boolean) {
    
  }

  function onAccassabilityChange(checked: boolean) {
    dispatch(changeAccessability(checked))
  }

  function changeLanguage(e: any) {
    const language = e.target.value;
    localStorage.language = language;
    if ( language === 'eng' ) {
      dispatch(setEnglish())
    } else { dispatch(setRussian()) }
  }

  const sheduleTitle = (language === 'eng') ? 'Schedule' : 'Расписание';
  const theme = (language === 'eng') ? 'Dark mode' : 'Темная тема';
  const profile = (language === 'eng') ? 'My profile' : 'Мой профиль';
  
  return (
    <nav>
      <ul>
        <li>
          <a href="/"
            className="">
            <img
              src={logo}
              alt="Rolling Scopes School Logo"
              className="header-logo" />
          </a>
        </li>
        <li>
          <Title level={accessability ? 2 : 3}>{sheduleTitle}</Title>
        </li>
        <li>
          <div>
            <label> {theme} </label>
            <Switch defaultChecked onChange={onThemeChange} />
          </div>
          <div className="align-flex">
            <label> <EyeInvisibleTwoTone style={eyeIconStyle} /> </label>
            <Switch checked={accessability} onChange={onAccassabilityChange} />
            <label> <EyeTwoTone style={eyeIconStyle} /> </label>
          </div>

          <Button
            className="profile-btn"
            type="dashed">
            <Avatar
              className="avatar"
              size="small"
              icon={<UserOutlined />} />
              <span className = "profile" >
                {profile}
              </span>
          </Button>
        </li>
        <li><Radio.Group 
              defaultValue={language} 
              size="small"
              onChange={changeLanguage}
            >
              <Radio.Button value="eng">Eng</Radio.Button>
              <Radio.Button value="ru">Ru</Radio.Button>
            </Radio.Group>
        </li>
      </ul>
    </nav>
  )
}

export default MainPageHeader;