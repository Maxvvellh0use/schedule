import React from 'react';
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

import './TaskCreatorLayout.scss';

const TaskCreatorLayout: React.FC = () => {
  const { Header, Content } = Layout;
  const formItemLayout = {
    labelCol: { span: 20 },
    wrapperCol: { span: 20 },
  };
  

  function onFinish(values: any): any {
    console.log('Received values of form: ', values);
  }
  return (
    <Layout>
      <Header>
        <MainPageHeader />
      </Header>
      <Form
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
                  <AddressContainer />
                </div>
              <div className="container">
                <BottomContainer/>
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}> 
                  <Button type="primary" htmlType="submit">
                    Create
                  </Button>
                </Form.Item>                
              </div>
            </Col>         
          </Row>
        </Content>
      </Form>
    </Layout>
  )
 }

export default TaskCreatorLayout;