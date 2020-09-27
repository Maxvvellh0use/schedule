import React, { useState } from 'react';
import { useSelector } from 'react-redux'
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
import { SliderPicker } from 'react-color'
import { RootStateType} from "../../types";
import 'antd/dist/antd.css';
import { MinusCircleOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';

import { TASK_TYPES, COURSES, defaultColor } from './const';

import './LeftPanel.scss';

const LeftPanel: React.FC = () => {
  const [taskTypes, setTaskTypes] = useState({
    initialTypes: TASK_TYPES,
    newType: ''
  });
  const [deadlineFormEnabled, setDeadlineFormEnabled] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const language = useSelector<RootStateType, string>(state => state.app.language);
  const eventName = ( language === 'eng') ? 'Event name' : 'Название события';
  const eventNamePlaceholder = ( language === 'eng') ? 'Event name' : 'Название события';
  const eventNameMessage = ( language === 'eng') ? 'Please enter task name!' : 'Пожалуйста введите название события';
 
  const taskType = ( language === 'eng') ? 'Select type of your task' : 'Выберите тип задания';
  const taskTypePlaceholder = ( language === 'eng') ? 'Please, select type of your task' : 'Пожалуйста, выберите тип задания';
  const taskTypeMessage = ( language === 'eng') ? 'Please select type of your task!' : 'Пожалуйста, выберите тип задания!';
  const addTaskType = ( language === 'eng') ? 'Add type' : 'Добавить тип';

  const course = ( language === 'eng') ? 'Select course' : 'Выберите курс';
  const courseMessage = ( language === 'eng') ? 'Please select course!' : 'Пожалуйста, выберите курс!';
  
  const organizer = ( language === 'eng') ? 'Organizer' : 'Организатор';
  const organizerPlaceholder = ( language === 'eng') ? 'Organizer github url' : 'Ссылка на github организатора';
  
  const startDate = ( language === 'eng') ? 'Start date and time' : 'Дата и время начала';
  const startDateMessage = ( language === 'eng') ? 'Please select date!' : 'Пожалуйста выберите дату!';
  const startTimeMessage = ( language === 'eng') ? 'Please select time!' : 'Пожалуйста выберите время!';

  const taskDeadlineSelector = ( language === 'eng') ? 'Task has deadline' : 'Срок выполнения задачи';

  const deadlineDate = ( language === 'eng') ? 'Deadline date and time' : 'Дата и время выполнения';
  const deadlineMessage = ( language === 'eng') ? 'Please select date!' : 'Пожалуйста выберите дату';

  const descriptionURL = ( language === 'eng') ? 'Description URL' : 'URL описания';
  const descriptionURLMessage = ( language === 'eng') ? 'Please enter task name!' : 'Пожалуйста введите название таска';

  const addMaterialURL = ( language === 'eng') ? 'Add Material URL' : 'Добавить URL материалов';
  const missingMaterialURL = ( language === 'eng') ? 'Missing Material URL' : 'Пропущен URL материалов';
  const materialURL = ( language === 'eng') ? 'Material URL' : 'URL материалов';
  const expectedResults = ( language === 'eng') ? 'Expected results description' : 'Описание ожидаемых результатов';
 
  function onTypeChange(event: { target: { value: string; }; }) {
    setTaskTypes({ initialTypes: taskTypes.initialTypes, newType: event.target.value });
    setColorPickerVisible(true);
  };

  function addItem() {
    setTaskTypes((prevState: { initialTypes: string[], newType: string }) => {
      prevState.initialTypes.push(prevState.newType);
      return {
        initialTypes: prevState.initialTypes,
        newType: ''
      }
    });
    setColorPickerVisible(false);
  }

  function onHasDeadlineChange(e: { target: { checked: boolean; }; }) {
    setDeadlineFormEnabled(e.target.checked);
  }

  function handleChangeComplete() {
    //TODO save types colors to DB
  }

  return (
   <>
    <Form.Item
      name="name"
      label={eventName}
      rules={[{ required: true, message: eventNameMessage }]}>
      <Input placeholder={eventNamePlaceholder} />
    </Form.Item>
    <Form.Item
      name="type"
      label={taskType}
      hasFeedback      
      rules={[{ required: true, message: taskTypeMessage }]}>
        <Select placeholder={taskTypePlaceholder}
          showSearch
          dropdownRender={menu => (
            <div className="type-options">
              {menu}
              <Divider />
              <div className="new-type-add-container">
                <Input value={taskTypes.newType} onChange={onTypeChange} />
                <a onClick={addItem}>
                  <PlusOutlined /> {addTaskType}
                </a>
              </div>
              {colorPickerVisible
                ? <SliderPicker 
                  color={defaultColor}
                  onChangeComplete={handleChangeComplete} />
                : null}
            </div>
          )}>
          {taskTypes.initialTypes.map(item => (
            <Select.Option value={item} key={item}>{item}</Select.Option>
          ))}
      </Select>
      </Form.Item>
      
    <Form.Item name="course"
      label={course}
        rules={[{ required: true, message: courseMessage }]}>
      <Select
        showSearch
        placeholder={course}>
          {COURSES.map((course: any) => <Select.Option key={course} value={course}>{course}</Select.Option>)}
      </Select>      
    </Form.Item>
      
    <Form.Item
      name="organizer"
      label={organizer}>
      <Input placeholder={organizerPlaceholder} />
    </Form.Item>
      
    <Form.Item
      name="date"
      label={startDate}
      rules={[{ type: 'object', required: true, message: startDateMessage }]}>
      <DatePicker />
    </Form.Item>
    <Form.Item
      name="time"
      rules={[{ type: 'object', required: true, message: startTimeMessage }]}>
      <TimePicker />
    </Form.Item>
    <Form.Item name="hasDeadline" valuePropName="checked">
      <Checkbox onChange={onHasDeadlineChange}>{taskDeadlineSelector}</Checkbox>
    </Form.Item>
    <Form.Item
      name="deadlineDate"
      label={deadlineDate}
      rules={[{ type: 'object', required: deadlineFormEnabled, message: deadlineMessage }]}>
      <DatePicker disabled={!deadlineFormEnabled} />
    </Form.Item>
    <Form.Item
      name="deadlineTime"
      rules={[{ type: 'object', required: deadlineFormEnabled, message: startTimeMessage }]}>
      <TimePicker disabled={!deadlineFormEnabled} />
    </Form.Item>
    <Form.Item
      name="description"
      label={descriptionURL}
      rules={[{ required: false, message: descriptionURLMessage }]}>
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
                  rules={[{ required: true, message: missingMaterialURL }]}>
                  <Input placeholder={materialURL} />
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
                  <PlusOutlined /> {addMaterialURL}
              </Button>
            </Form.Item>            
          </div>
        );
      }}
    </Form.List>
    <Form.Item
      name="result"
      label={expectedResults}>
        <Input.TextArea rows={2} />
    </Form.Item> 
  </>
 )
}

export default LeftPanel