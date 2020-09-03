import React from 'react';

import './TaskPage.scss'
import { useParams } from 'react-router-dom';
import { EventData } from '../types';
import { useSelector } from 'react-redux';
import MainPageHeader from '../MainPageHeader/MainPageHeader';
import { Layout, Divider, Typography } from 'antd';
import Title from 'antd/lib/skeleton/Title';

interface RootState {
  allEventsData: EventData[];
  app: {
    loading: boolean,
    errorText: string,
  },
}

const TaskPage: React.FC = () => {
  const { id } = useParams();
  const allEventsData = useSelector<RootState, EventData[]>(state => state.allEventsData);
  const curEvent = allEventsData.find((event) => event.id == id);
  const { Header, Content } = Layout;
  const { Title } = Typography;
  return (
    <Layout>
      <Header>
        <MainPageHeader />
      </Header>
      <Content>
        <div className="container">
          <div className="top-container">
            <Title level={4}>{curEvent? curEvent.name : 'Название'}</Title>
          </div>
          <Divider/>




        </div>
      </Content>
   </Layout>
  )
}

export default TaskPage;