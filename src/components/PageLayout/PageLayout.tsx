import React, { useEffect, useState } from "react";
import { Layout} from 'antd';

import MainTable from '../MainTable/MainTable';
import PageHeader from '../PageHeader/PageHeader';

import './PageLayout.scss';

const PageLayout: React.FC = () => {
  const { Header, Footer, Sider, Content } = Layout;

  return (
     <>
      <Layout>
        <Header>
          <PageHeader/>
        </Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>
            <MainTable />
          </Content>         
        </Layout>        
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
}

export default PageLayout;


