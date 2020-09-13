import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootStateType} from "../types";
import { Layout, ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import enUS from 'antd/es/locale/en_US';
import ruRU from 'antd/es/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';

import MainTab from "../MainTab/MainTab";
import MainPageHeader from '../MainPageHeader/MainPageHeader';
import SideBar from '../SideBar/SideBar';
import TopPanel from '../TopPanel/TopPanel';

import './MainPageLayout.scss';

const MainPageLayout: React.FC = () => {
  const { Header, Footer, Sider, Content } = Layout;  
  const accessability = useSelector<RootStateType, boolean>(state => state.app.accessability);
  const language = useSelector<RootStateType, string>(state => state.app.language);
  const locale = ( language === 'eng') ? enUS : ruRU;
  if (language === 'eng') {
    moment.locale('en')
  } else {
    moment.locale('ru')
  }
  
  return (
     <>
      <ConfigProvider locale={locale}>
      <Layout className={accessability ? 'accessability-on' : ''}>
        <Header>
          <MainPageHeader/>
        </Header>
        <Layout>
          <Sider>
            <SideBar/>
          </Sider>
          <Content>
            <TopPanel/>
            <MainTab />
          </Content>
        </Layout>
      </Layout>
      </ConfigProvider>
    </>
  );
}


export default MainPageLayout;


