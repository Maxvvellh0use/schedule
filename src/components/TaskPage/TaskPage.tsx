import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './TaskPage.scss'

import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {EventData , RootStateType} from '../types';
import MainPageHeader from '../MainPageHeader/MainPageHeader';
import { Layout, Divider, Typography, Button, Popconfirm, message, Rate } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import MapComponent from '../TaskCreator/MapComponent/MapComponent';
import { getRawContent, isMarkdown, getCoordinates, deleteEventById } from './helpers';
import TaskDescription from '../TaskDescription/TaskDescription';
import { getEventsData } from '../../redux/actions';

const TaskPage: React.FC = () => {
  const mode = useSelector<RootStateType>(state => state.app.mode);
  const [source, setSource] = useState <string | undefined>('');
  const { id } = useParams();
  const dispatch = useDispatch();
  const allEventsData = useSelector<RootStateType, EventData[]>(state => state.allEventsData);
  const accessability = useSelector<RootStateType, boolean>(state => state.app.accessability);
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

  async function confirmDeletion(e: any) {
    console.log(e);
    await deleteEventById(curEvent?._id);
    dispatch(getEventsData()); 
    message.success('Event deleted');
}

  function cancelDeletion(e: any) {
  console.log(e);
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
    <Layout className={accessability ? 'accessability-on' : ''}>
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
          {(curEvent && curEvent.optional.feedback) 
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
