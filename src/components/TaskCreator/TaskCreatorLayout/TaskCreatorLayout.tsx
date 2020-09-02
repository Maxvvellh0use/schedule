import React, { useState } from 'react';
import {
  Layout,
  Row,
  Col,
  Form,
  Button,
} from 'antd';
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import MainPageHeader from '../../MainPageHeader/MainPageHeader';
import LeftPanel from '../LeftPanel/LeftPanel';
import AddressContainer from '../AddressContainer/AddressContainer';
import BottomContainer from '../BottomContainer/BottomContainer';

import './TaskCreatorLayout.scss';
import { parseFormValuesToEventData } from './helpers';
import { createEvent, getEventsData } from '../../../redux/actions';
import { Store } from 'antd/lib/form/interface';


interface RootState {
  loading: boolean,
  errorText: string,
}

const TaskCreatorLayout: React.FC = () => {
  const { Header, Content } = Layout;
  const formItemLayout = {
    labelCol: { span: 20 },
    wrapperCol: { span: 100 },
  };
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector<RootState, boolean>(state => state.loading);

  function onMarkerMove(value: string) {
    form.setFieldsValue({
      place: value,
    });
  }  

  function onFinish(values: Store): void {
    console.log('Received values of form: ', values);
    const eventData = parseFormValuesToEventData(values);
    dispatch(createEvent(eventData));
    dispatch(getEventsData());
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
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Create
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