import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './TaskPage.scss'

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {EventData , RootStateType} from '../types';
import MainPageHeader from '../MainPageHeader/MainPageHeader';
import { Layout, Divider, Typography, Button, Popconfirm, message, Rate } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import MapComponent from '../TaskCreator/MapComponent/MapComponent';
import { getRawContent, isMarkdown, getCoordinates, deleteEventById } from './helpers';
import TaskDescription from '../TaskDescription/TaskDescription';
import { getEventsData } from '../../redux/actions';
import { defaultEvent } from "./const";

const TaskPage: React.FC = () => {
  const mode = useSelector<RootStateType>(state => state.app.mode);
  const [source, setSource] = useState <string | undefined>('');
  const { id } = useParams();
  console.log(id)
  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEventsData());
    }, [dispatch]);
  const allEventsData = useSelector<RootStateType, EventData[]>(state => state.allEventsData);
  console.log(allEventsData)
  const accessability = useSelector<RootStateType, boolean>(state => state.app.accessability);
  const curEvent = allEventsData.length ? allEventsData.find((event) => event._id === id) : defaultEvent;
  const { Header, Content } = Layout;
  const { Title } = Typography;

  useEffect(() => {
    if (curEvent && isMarkdown(curEvent.optional.description)) {
      getRawContent(curEvent.optional.description)
        .then(res => setSource(res));
    }
  },[curEvent])

  async function confirmDeletion(e: any) {
    await deleteEventById(curEvent?._id);
    dispatch(getEventsData());
    message.success('Event deleted');
}

  function cancelDeletion(e: any) {
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
            <Title level={accessability ? 2 : 3}>Event Info</Title>
            { mode === 'mentor' ? editPanel : null }
          </div>
          <Divider />
          <div className="task-description">
            { source ? <ReactMarkdown className="markdown-container" source={source} /> : <TaskDescription event={curEvent}/> }
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
