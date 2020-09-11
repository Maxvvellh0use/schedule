import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './TaskPage.scss'
import { useParams } from 'react-router-dom';
import {EventData , RootStateType} from '../types';
import { useSelector } from 'react-redux';
import MainPageHeader from '../MainPageHeader/MainPageHeader';
import { Layout, Divider, Typography, Button, Popconfirm, message, Rate } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import MapComponent from '../TaskCreator/MapComponent/MapComponent';
import { getRawContent, isMarkdown, getCoordinates } from './helpers';
import TaskDescription from '../TaskDescription/TaskDescription';

interface RootState {
  allEventsData: EventData[];
  app: {
    loading: boolean,
    errorText: string,
  },
}

const TaskPage: React.FC = () => {
  const mode = useSelector<RootStateType>(state => state.app.mode);
  const [source, setSource] = useState <string | undefined>('');
  const { id } = useParams();
  const allEventsData = useSelector<RootState, EventData[]>(state => state.allEventsData);
  const curEvent = allEventsData.find((event) => event._id === id);
  console.log(curEvent)
  const { Header, Content } = Layout;
  const { Title } = Typography;

  useEffect(() => {
    if (curEvent && isMarkdown(curEvent.optional.description)) {
      getRawContent(curEvent.optional.description)
        .then(res => setSource(res));
    }
  },[])

  function confirmDeletion(e: any) {
  console.log(e);
    message.success('Click on Yes');
    //TODO delete event from db ???
}

  function cancelDeletion(e: any) {
  console.log(e);
  message.error('Click on No');
}

const editPanel = (
    <div className="right-panel">
      <Button className="task-btn" type="dashed" shape="circle" icon={<EditOutlined />} />
      <Popconfirm
          title="Are you sure delete this task?"
          onConfirm={confirmDeletion}
          onCancel={cancelDeletion}
          okText="Yes"
          cancelText="No"
      >
        <Button className="task-btn" type="dashed" shape="circle" icon={<DeleteOutlined />} />
      </Popconfirm>
    </div>
)
  return (
    <Layout>
      <Header>
        <MainPageHeader />
      </Header>
      <Content>
        <div className="container">
          <div className="top-container">
            <Title level={4}>Event Info</Title>
            { mode === 'mentor' ? editPanel : null }
          </div>
          <Divider />
          <div className="task-description">
            { source ? <ReactMarkdown source={source} /> : <TaskDescription event={curEvent}/> }
          </div>
          <Divider />
          <MapComponent
            onMarkerMove={() => { }}
            coordinates={getCoordinates(curEvent)} />
          <Divider />
          {curEvent && curEvent.optional.feedback === 'true'
            ? <div className="rate-container" >
                <Rate /> <span>How do you like this task?</span>
              </div>
            : null}
        </div>
      </Content>
   </Layout>
  )
}

export default TaskPage;
