import React, { useEffect, useState } from "react";
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import MainTab from "../MainTab/MainTab";
import MainPageHeader from '../MainPageHeader/MainPageHeader';
import SideBar from '../SideBar/SideBar';
import TopPanel from '../TopPanel/TopPanel';

import './MainPageLayout.scss';
import { getEventsData } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../types";

const MainPageLayout: React.FC = () => {
  const { Header, Footer, Sider, Content } = Layout;  
  const accessability = useSelector<RootStateType, boolean>(state => state.app.accessability);
  return (
     <>
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
    </>
  );
}


export default MainPageLayout;


