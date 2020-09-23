import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootStateType} from "../types";
import { Layout, ConfigProvider, Col, Row } from 'antd';
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
    //  <>
    //   <ConfigProvider locale={locale}>
    //   <Layout className={accessability ? 'accessability-on' : ''}>
    //     <Header>
    //       <MainPageHeader/>
    //     </Header>
    //     <Layout>
    //       <Sider       
    //       // breakpoint="lg"
    //       // collapsedWidth="0"
    //       // onBreakpoint={broken => {
    //       //   console.log(broken);
    //       // }}
    //       // onCollapse={(collapsed, type) => {
    //       //   console.log(collapsed, type);
    //       // }}
    //       >
    //         <SideBar/>
    //       </Sider>
    //       <Content>
    //         <TopPanel/>
    //         <MainTab />
    //       </Content>
    //     </Layout>
    //   </Layout>
    //   </ConfigProvider>
    // </>
    <>
    <ConfigProvider locale={locale}>
    <Layout className={accessability ? 'accessability-on' : ''}>
      <Header>
        <MainPageHeader/>
      </Header>
      <Row>
        <Col xs={{span: 24, order: 2 }} sm={{span: 24, order: 2 }} md={{span: 24, order: 2 }} lg={{span: 7, order: 1 }} xl={{span: 7, order: 1 }}>
          <SideBar/>
        </Col>
        <Col xs={{span: 24, order: 1 }} sm={{span: 24, order: 1 }} md={{span: 24, order: 1 }} lg={{span: 17, order: 2 }} xl={{span: 17, order: 2 }}>
          <TopPanel/>
          <MainTab/>
        </Col>
      </Row>
    </Layout>
    </ConfigProvider>
  </>
  );
}


export default MainPageLayout;


