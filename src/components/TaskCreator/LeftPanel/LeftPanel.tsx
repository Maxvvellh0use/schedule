import React, { useState } from 'react';
import {
  Form,
  Select,
  Checkbox,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Space,
  Divider
} from 'antd';
import 'antd/dist/antd.css';
import { MinusCircleOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';

import { TASK_TYPES } from './const';

import './LeftPanel.scss';

const LeftPanel: React.FC = () => {
  const [taskTypes, setTaskTypes] = useState({
    initialTypes: TASK_TYPES,
    newType: ''
  });
  const [deadlineFormEnabled, setDeadlineFormEnabled] = useState(false);

  function onTypeChange(event: { target: { value: string; }; }) {
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

  return (
   <>
    <Form.Item
      name="name"
      label="Event name"
      rules={[{ required: true, message: 'Please enter task name!' }]}>
      <Input placeholder="Type task name" />
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
              <Input value={taskTypes.newType} onChange={onTypeChange} />
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
    <Form.Item name="hasDeadline" valuePropName="checked">
      <Checkbox onChange={onHasDeadlineChange}>Task has deadline</Checkbox>
    </Form.Item>
    <Form.Item
      name="deadlineDate"
      label="Deadline date and time"
      rules={[{ type: 'object', required: deadlineFormEnabled, message: 'Please select date!' }]}>
      <DatePicker disabled={!deadlineFormEnabled} />
    </Form.Item>
    <Form.Item
      name="deadlineTime"
      rules={[{ type: 'object', required: deadlineFormEnabled, message: 'Please select time!' }]}>
      <TimePicker disabled={!deadlineFormEnabled} />
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
                  onClick={() => { remove(field.name); }} />
              </Space>))
            }
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => { add();}}
                block>
                  <PlusOutlined /> Add Material URL
              </Button>
            </Form.Item>
            <Form.Item
              name="result"
              label="Expected results description">
                <Input.TextArea rows={2} />
            </Form.Item>
          </div>
        );
      }}
    </Form.List> 
  </>
 )
}

export default LeftPanel