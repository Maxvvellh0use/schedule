import React, { useEffect, useState } from "react";
import { Button, Avatar, Switch, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './MainPageHeader.scss';

import logo from '../../assets/img/logo-rsschool3.png';
import {useDispatch , useSelector} from "react-redux";
import {changeTheme} from "../../redux/actions";
import {RootStateType} from "../types";
import {useThemeSwitcher} from "react-css-theme-switcher";

const MainPageHeader: React.FC = () => {

  const theme = useSelector<RootStateType>(state => state.app.theme);

  const dispatch = useDispatch();

  const { Title } = Typography;

  function onChange(checked: any) {
    console.log(`switch to ${checked}`);
  }

  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const { switcher, themes, currentTheme } = useThemeSwitcher();

  const toggleDarkMode = () => {
    setIsDarkMode(previous => {
      switcher({ theme: previous ? themes.light : themes.dark });
      return !previous;
    });
  };

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
            <Switch checked={theme === 'dark'}
                    onChange={(checked) => toggleDarkMode()} />
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
