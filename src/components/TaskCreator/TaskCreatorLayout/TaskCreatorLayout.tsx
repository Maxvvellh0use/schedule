import React, { useEffect } from 'react';
import {
  Layout,
  Row,
  Col,
  Form,
  Button,
} from 'antd';
import 'antd/dist/antd.css';

import MainPageHeader from '../../MainPageHeader/MainPageHeader';
import LeftPanel from '../LeftPanel/LeftPanel';
import AddressContainer from '../AddressContainer/AddressContainer';
import BottomContainer from '../BottomContainer/BottomContainer';
import { useHistory, useParams } from 'react-router-dom';

import './TaskCreatorLayout.scss';
import { useSelector } from 'react-redux';
import { EventData } from '../../types';
import moment from 'moment';

interface RootState {
  allEventsData: EventData[];
}

const TaskCreatorLayout: React.FC = () => {
  const { id } = useParams();
  console.log(id);
  const allEventsData = useSelector<RootState, EventData[]>(state => state.allEventsData);
  console.log(allEventsData);
  const curEvent = allEventsData.find((event) => event._id === id);
  console.log(curEvent);
  const { Header, Content } = Layout;
  const formItemLayout = {
    labelCol: { span: 20 },
    wrapperCol: { span: 100 },
  };

  const [form] = Form.useForm();

  const history = useHistory();

  useEffect(() => {
    if (curEvent) {
      form.setFieldsValue({
        name: curEvent.name,
        course: curEvent.course,
        type: curEvent.type,
        date: moment(curEvent.optional.date),
        time: moment(curEvent.optional.date),
        hasDeadline: curEvent.optional.deadline,
        deadlineDate: moment(curEvent.optional.deadline),
        deadlineTime: moment(curEvent.optional.deadline),
        description: curEvent.optional.description,
        materials: curEvent.optional.materials,
        result: curEvent.optional.result,
        place: curEvent.optional.place,
        details: curEvent.optional.details,
        duration: curEvent.optional.duration,
        notate: curEvent.optional.notate,
      });
    }
  }, [curEvent, form, moment]);    

  function onMarkerMove(value: string) {
    form.setFieldsValue({
      place: value,
    });
  }  

  function onFinish(values: any): any {
    console.log('Received values of form: ', values);
  }

  return (
    <Layout>
      <Header>
        <MainPageHeader />
      </Header>
      <Button type="link" onClick={() => history.push('/')} >
        Back to schedule
      </Button> 
      <Form
        form={form}
        onFinish={onFinish}
        {...formItemLayout}
        layout="vertical"
      >
        <Content>
          <Row>          
              <Col flex={1}>
                <div className="container">
                  <LeftPanel />                  
                </div>
              </Col>
              <Col flex={3}>
                <div className="container">
                <AddressContainer onMarkerMove={onMarkerMove} />
                </div>
              <div className="container bottom-container">
                <BottomContainer/>
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}> 
                  <Button type="primary" htmlType="submit">
                    {curEvent ? 'Complete edition' : 'Create'}
                  </Button>
                </Form.Item>
                <Button type="link" onClick={() => history.push('/')} >
                  Back to schedule
                </Button>                
              </div>
            </Col>         
          </Row>
        </Content>
      </Form>
    </Layout>
  )
 }

export default TaskCreatorLayout;