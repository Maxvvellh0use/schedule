import React, { useEffect, useState } from "react";
import { Button, Avatar, Switch, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './MainPageHeader.scss';

import logo from '../../assets/img/logo-rsschool3.png';

const MainPageHeader: React.FC = () => {

  const { Title } = Typography;

  function onChange(checked: any) {
    console.log(`switch to ${checked}`);
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
          <Title level={3}>Schedule</Title>
        </li>
        <li>
          <div>
            <label> Dark mode </label>
            <Switch defaultChecked onChange={onChange} />
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