import React, { useEffect, useState } from "react";
import { Button, Avatar, Switch, Typography, Radio, Menu, Col, Row } from 'antd';
import { UserOutlined, EyeTwoTone, EyeInvisibleTwoTone } from '@ant-design/icons';
import Icon from '@ant-design/icons';
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
const Sun = () => (
  <svg aria-hidden="true" data-prefix="fas" data-icon="sun" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path></svg>
);
const Moon = () => ( 
  <svg aria-hidden="true" data-prefix="far" data-icon="moon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M279.135 512c78.756 0 150.982-35.804 198.844-94.775 28.27-34.831-2.558-85.722-46.249-77.401-82.348 15.683-158.272-47.268-158.272-130.792 0-48.424 26.06-92.292 67.434-115.836 38.745-22.05 28.999-80.788-15.022-88.919A257.936 257.936 0 0 0 279.135 0c-141.36 0-256 114.575-256 256 0 141.36 114.576 256 256 256zm0-464c12.985 0 25.689 1.201 38.016 3.478-54.76 31.163-91.693 90.042-91.693 157.554 0 113.848 103.641 199.2 215.252 177.944C402.574 433.964 344.366 464 279.135 464c-114.875 0-208-93.125-208-208s93.125-208 208-208z"></path></svg>
 );
const SunIcon = (props: any) => <Icon component={Sun}{...props} />;
const MoonIcon = (props: any) => <Icon component={Moon}{...props} />;

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
          <Col xs= '8' sm= '8' md= '8' lg= '4' xl= '4'>
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
          <Col xs= '8' sm= '8' md= '8' lg= '4' xl= '4'>
            <Menu.Item className = 'menu-item'>
              <Title level={accessability ? 2 : 3}>{sheduleTitle}</Title>
            </Menu.Item>
          </Col>
          <Col xs= '8' sm= '8' md= '8' lg= '4' xl= '4'>
            <Menu.Item className = 'menu-item'>
              <div>
                <label style = {{display: 'none'}} > {theme} </label>
                <Switch defaultChecked 
                  onChange={onThemeChange} 
                  checkedChildren={<MoonIcon/>}
                  unCheckedChildren={<SunIcon/>}/>
              </div>
            </Menu.Item>
          </Col>
          <Col xs= '8' sm= '8' md= '8' lg= '4' xl= '4'>
            <Menu.Item className = 'menu-item'>
              <div className="align-flex">
                <label> <EyeInvisibleTwoTone style={eyeIconStyle} /> </label>
                <Switch checked={accessability} onChange={onAccassabilityChange}/>
                <label> <EyeTwoTone style={eyeIconStyle} /> </label>
              </div>
            </Menu.Item>
          </Col>
          <Col xs= '8' sm= '8' md= '8' lg= '4' xl= '4'>
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
          <Col xs= '8' sm= '8' md= '8' lg= '8' xl= '8'>
            <Menu.Item className = 'menu-item'><Radio.Group 
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