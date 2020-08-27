import React, { useEffect, useState } from "react";
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import MainTab from "../MainTab/MainTab";
import MainPageHeader from '../MainPageHeader/MainPageHeader';
import SideBar from '../SideBar/SideBar';
import TopPanel from '../TopPanel/TopPanel';

import './MainPageLayout.scss';

const MainPageLayout: React.FC = () => {
  const { Header, Footer, Sider, Content } = Layout;

  return (
     <>
      <Layout>
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
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
}


export default MainPageLayout;


