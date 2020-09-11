import React, { useEffect, useState } from "react";
import { Layout } from 'antd';
import { ThemeSwitcherProvider, useThemeSwitcher } from 'react-css-theme-switcher';

import MainTab from "../MainTab/MainTab";
import MainPageHeader from '../MainPageHeader/MainPageHeader';
import SideBar from '../SideBar/SideBar';
import TopPanel from '../TopPanel/TopPanel';

import './MainPageLayout.scss';

const themes = {
  light: './dark.css',
  dark: './light.css',
};

const MainPageLayout: React.FC = () => {
  const { Header, Footer, Sider, Content } = Layout;


  return (
     <>
       <ThemeSwitcherProvider defaultTheme='light' themeMap={themes}>
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
       </ThemeSwitcherProvider>
    </>
  );
}


export default MainPageLayout;


