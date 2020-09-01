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
import { useHistory } from 'react-router-dom';

import './TaskCreatorLayout.scss';

const TaskCreatorLayout: React.FC = () => {
  const { Header, Content } = Layout;
  const formItemLayout = {
    labelCol: { span: 20 },
    wrapperCol: { span: 100 },
  };

  const [form] = Form.useForm();

  const history = useHistory();

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