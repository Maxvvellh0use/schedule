import React, { useState, useEffect } from 'react';
import { Select, Radio } from 'antd';
import { SliderPicker } from 'react-color';
import { useDispatch } from 'react-redux';
import { getTableColors } from '../../redux/actions'

import './user-color-settings.scss';

interface Events {
  eventsData: string[];
}

const { Option } = Select;

const UserColorSettings: React.FC<Events> = ({eventsData}) => {

  const [color, setColor] = useState('#eeeeee');
  const [property, setProperty] = useState('color');
  const [task, setTask] = useState('Deadline');
  const defaultColorMessage = (color === '#eeeeee') ? <p>Color example</p> : null;
  const dispatch = useDispatch();

  useEffect(() => {
    handleColor()
    dispatch(getTableColors());
  })

  const saveLocalStorageData = () => {

    let styles = localStorage.getItem(task);

    if (styles) {
      const colorData = JSON.parse(styles);
      colorData[property] = color;
      localStorage.setItem(task, JSON.stringify(colorData))
    } else { 
      const colorData: {[index: string]:string}  = {};
      colorData[property] = color;
      localStorage.setItem(task, JSON.stringify(colorData))
    }
  }

  const handleChange = (value: string) => {
    setTask(value);
  }

  const handleStyleProperty = (e: any) => {
    setProperty(e.target.value);
  }

  const handleColor = () => {
    saveLocalStorageData();
  }

  const events = eventsData.map(event =>  <Option value={event} key={event}>{event}</Option>)

  return(
    <div>
      <p className="color-settings-title">Select task</p>
      <Select 
        getPopupContainer={trigger => trigger.parentNode}
        defaultValue="Deadline" 
        style={{ width: 120 }} 
        onChange={handleChange}>
          {events}
      </Select>
      <p className="color-settings-title">Select property</p>
      <Radio.Group 
        defaultValue="color" 
        onChange={handleStyleProperty}
        >
        <Radio.Button value="color">Text</Radio.Button>
        <Radio.Button value="backgroundColor">Background</Radio.Button>
      </Radio.Group>
      <p className="color-settings-title">Select color</p>
      <SliderPicker 
        color={color}
        onChangeComplete={ (color) => {
          setColor(color.hex)
        }
      }/>
      <div className="color-swatch" style={{
        backgroundColor: color
      }}>
        { defaultColorMessage }
     </div>
    </div>
  )
}

export default UserColorSettings