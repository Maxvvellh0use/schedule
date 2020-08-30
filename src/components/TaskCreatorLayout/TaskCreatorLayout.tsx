import React, { SyntheticEvent, useState } from 'react';
import {
  Layout,
  Row,
  Col,
  Form,
  Select,
  Checkbox,
  Input,
  Button,
  Upload,
  Divider,
  DatePicker,
  TimePicker, 
  Space

} from 'antd';
import 'antd/dist/antd.css';
import MainPageHeader from '../MainPageHeader/MainPageHeader';
import { MinusCircleOutlined, InboxOutlined, PlusOutlined  } from '@ant-design/icons';

import MapComponent from '../MapComponent/MapComponent';

import './TaskCreatorLayout.scss';

const TaskCreatorLayout: React.FC = () => {
  const [taskTypes, setTaskTypes] = useState({
    initialTypes: ["Self Education", "Task", "YouTube Live", "Meetup", "Test", "Optional Lesson", "Interview", "Crosscheck", "Registration"],
    newType: ''
  });
  const [deadlineFormEnabled, setDeadlineFormEnabled] = useState(false);

  const { Header, Content } = Layout;
  const formItemLayout = {
    labelCol: { span: 20 },
    wrapperCol: { span: 20 },
  };
  const normFile = (e: { fileList: any; }) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  function onFinish(values: any): any {
    console.log('Received values of form: ', values);
  }

  function onTypeChange (event: { target: { value: string; }; }) {
    setTaskTypes({ initialTypes: taskTypes.initialTypes, newType: event.target.value });
  };

  function addItem() {
    console.log('addItem');    
    setTaskTypes((prevState: { initialTypes: string[], newType: string }) => {
      prevState.initialTypes.push(prevState.newType);
      return {
        initialTypes: prevState.initialTypes,
        newType: ''
      }      
    });    
  }

  function onHasDeadlineChange(e: { target: { checked: boolean; }; }) {
    console.log(`checked = ${e.target.checked}`);
    setDeadlineFormEnabled(e.target.checked);
  }

  function addMaterial() {
    
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
                  
                  <Form.Item
                    name="name"
                    label="Event name"
                    rules={[{ required: true, message: 'Please enter task name!' }]}>
                    <Input placeholder="Type task name"/>
                  </Form.Item>

                  <Form.Item
                    name="type"
                    label="Select type of your task"
                    hasFeedback
                    rules={[{ required: true, message: 'Please select type of your task!' }]}>
                    <Select placeholder="Please, select type of your task"
                      dropdownRender={menu => (
                        <div className="type-options">
                          {menu}
                          <Divider />
                          <div className="new-type-add-container">
                            <Input  value={taskTypes.newType} onChange={onTypeChange} />
                            <a onClick={addItem}>
                              <PlusOutlined /> Add type
                            </a>
                          </div>
                        </div>
                      )}>
                      {taskTypes.initialTypes.map(item => (
                        <Select.Option value={item} key={item}>{item}</Select.Option>
                      ))}  
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="date"
                    label="Start date and time"
                    rules={[{ type: 'object', required: true, message: 'Please select date!' }]}>
                    <DatePicker />
                  </Form.Item>
                  <Form.Item
                    name="time" 
                    rules={[{ type: 'object', required: true, message: 'Please select time!' }]}>
                    <TimePicker />
                  </Form.Item>
                  <Form.Item
                    label="Task has deadline"
                    name="hasDeadline">                    
                    <Checkbox onChange={onHasDeadlineChange} value=""></Checkbox>
                  </Form.Item>
                  <Form.Item
                      name="deadlineDate"
                      label="Deadline date and time"
                      rules={[{ type: 'object', required: deadlineFormEnabled, message: 'Please select date!' }]}>
                      <DatePicker disabled={!deadlineFormEnabled}/>
                    </Form.Item>
                    <Form.Item
                      name="deadlineTime" 
                      rules={[{ type: 'object', required: deadlineFormEnabled, message: 'Please select time!' }]}>
                      <TimePicker disabled={!deadlineFormEnabled}/>
                    </Form.Item>
                  <Form.Item
                    name="description"
                    label="Description URL"
                    rules={[{ required: false, message: 'Please enter task name!' }]}>
                    <Input placeholder="URL" />
                  </Form.Item>                  
                  <Form.List name="materials">
                    {(fields, { add, remove }) => {
                      return (
                        <div>
                          {fields.map(field => (
                            <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                              <Form.Item
                                {...field}
                                name={field.name}
                                fieldKey={field.fieldKey}
                                rules={[{ required: true, message: 'Missing Material URL' }]}>
                                  <Input placeholder="Material URL" />
                              </Form.Item>                     

                              <MinusCircleOutlined
                                onClick={() => { remove(field.name);}}/>
                            </Space>))
                          }
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => {
                                add();
                              }}
                              block>
                              <PlusOutlined /> Add Material URL
                            </Button>
                          </Form.Item>
                        </div>
                      );
                    }}                         
                  </Form.List> 
                </div>
              </Col>
              <Col flex={3}>
                <div className="container">
                  <Form.Item
                    name="place"
                    label="Event address">
                      <Input placeholder="Address" />
                </Form.Item>
                <MapComponent/>
                </div>
              <div className="container">
                <Form.Item name="details" label="Details">
                  <Input.TextArea />
                </Form.Item>
                <Form.Item label="Dragger">
                  <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                    <Upload.Dragger name="files" action="/upload.do">
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                  </Form.Item>
                </Form.Item>
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