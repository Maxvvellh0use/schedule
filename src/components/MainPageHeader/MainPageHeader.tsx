import React, { useEffect, useState } from "react";
import { Button, Avatar, Switch, Typography } from 'antd';
import { UserOutlined, EyeTwoTone, EyeInvisibleTwoTone } from '@ant-design/icons';

import './MainPageHeader.scss';

import logo from '../../assets/img/logo-rsschool3.png';
import { RootStateType } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { changeAccessability } from "../../redux/actions";



const MainPageHeader: React.FC = () => {
  const { Title } = Typography;
  const accessability = useSelector<RootStateType, boolean>(state => state.app.accessability);
  const dispatch = useDispatch();
  const eyeIconStyle = { 
    fontSize: '1.3rem', 
    color: accessability ? '#290f72' : '#08c' 
  }

  function onThemeChange(checked: boolean) {
    
  }

  function onAccassabilityChange(checked: boolean) {
    dispatch(changeAccessability(checked))
  }
  
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
          <Title level={accessability ? 2 : 3}>Schedule</Title>
        </li>
        <li>
          <div>
            <label> Dark mode </label>
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
            My profile
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default MainPageHeader;