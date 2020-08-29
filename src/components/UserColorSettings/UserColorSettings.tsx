import React, { useState } from 'react';
import { Select, Radio } from 'antd';
import { SliderPicker } from 'react-color';

import './user-color-settings.scss';

const { Option } = Select;

const UserColorSettings: React.FC = () => {

  
  const [color, setColor] = useState('#eeeeee');
  const [property, setProperty] = useState('color');
  const [task, setTask] = useState('Deadline');

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
    console.log(`selected ${value}`);
    setTask(value);
  }

  const handleStyleProperty = (e: any) => {
    console.log('radio checked', e.target.value);
    setProperty(e.target.value);
  }

  const handleColor = (color: string) => {
    console.log('color', color);
    saveLocalStorageData();
  }

  return(
    <div>
      <p className="color-settings-title">Select task</p>
      <Select 
        defaultValue="Deadline" 
        style={{ width: 120 }} 
        onChange={handleChange}>
          <Option value="Deadline">Deadline</Option>
          <Option value="Test">Test</Option>
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
          handleColor(color.hex)
        }
      }/>
      <div style={{
        height: '50px',
        backgroundColor: color
      }}>
     </div>
    </div>
  )
}

export default UserColorSettings