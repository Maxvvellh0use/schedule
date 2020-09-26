import React, { useEffect, useState } from "react";
import { Button, Avatar, Switch, Typography, Radio, Menu, Col, Row } from 'antd';
import { UserOutlined, EyeTwoTone, EyeInvisibleTwoTone } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setEnglish, setRussian } from '../../redux/actions';

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
      <Menu className = 'menu'>
        <Row justify="space-around" align="middle">
          <Col xs= {{span: 12}} sm= {{span: 12}} md= {{span: 12}} lg= {{span: 4}} xl= {{span: 4}}>
            <Menu.Item className = 'menu-item'>
              <a href="/"
                className="">
                <img
                  src={logo}
                  alt="Rolling Scopes School Logo"
                  className="header-logo" />
              </a>
            </Menu.Item>
          </Col>
          <Col xs= {{span: 12}} sm= {{span: 12}} md= {{span: 12}} lg= {{span: 4}} xl= {{span: 4}}>
            <Menu.Item className = 'menu-item'>
              <Title level={accessability ? 2 : 3}>{sheduleTitle}</Title>
            </Menu.Item>
          </Col>
          <Col xs= {{span: 12}} sm= {{span: 6}} md= {{span: 6}} lg= {{span: 4}} xl= {{span: 4}}>
            <Menu.Item className = 'menu-item'>
              <div>
                <label style = {{display: 'none'}} > {theme} </label>
                <Switch defaultChecked 
                  onChange={onThemeChange} 
                  checkedChildren= 'dark'
                  unCheckedChildren= 'light'/>
              </div>
            </Menu.Item>
          </Col>
          <Col xs= {{span: 12}} sm= {{span: 6}} md= {{span: 6}} lg= {{span: 4}} xl= {{span: 4}}>
            <Menu.Item className = 'menu-item'>
              <div className="align-flex">
                <label> <EyeInvisibleTwoTone style={eyeIconStyle} /> </label>
                <Switch checked={accessability} onChange={onAccassabilityChange}/>
                <label> <EyeTwoTone style={eyeIconStyle} /> </label>
              </div>
            </Menu.Item>
          </Col>
          <Col xs= {{span: 12}} sm= {{span: 6}} md= {{span: 6}} lg= {{span: 4}} xl= {{span: 4}}>
            <Menu.Item className = 'menu-item profile-box'>
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
            </Menu.Item>
          </Col>
          <Col xs= {{span: 12}} sm= {{span: 6}} md= {{span: 6}} lg= {{span: 4}} xl= {{span: 4}}>
            <Menu.Item className = 'menu-item lang-choice-box'>
              <Radio.Group 
                  defaultValue={language} 
                  size="small"
                  onChange={changeLanguage}
                >
                  <Radio.Button value="eng">Eng</Radio.Button>
                  <Radio.Button value="ru">Ru</Radio.Button>
                </Radio.Group>
            </Menu.Item>
          </Col>
        </Row>
      </Menu>
    </nav>
  )
}

export default MainPageHeader;