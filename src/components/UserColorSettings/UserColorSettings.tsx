import React, { useState } from 'react';
import { Select, Radio } from 'antd';
import { SliderPicker } from 'react-color';

import './user-color-settings.scss';

const { Option } = Select;

const UserColorSettings: React.FC = () => {

  
  const [color, setColor] = useState('eeeeee');
  const [property, setProperty] = useState('text');
  const [task, setTask] = useState('Deadline');

  const saveLocalStorageData = () => {
    localStorage.setItem(task, JSON.stringify({backgroundColor: color, color}))
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setTask(value);
    saveLocalStorageData();
  }

  const handleStyleProperty = (e: any) => {
    console.log('radio checked', e.target.value);
    setProperty(e.target.value);
    saveLocalStorageData();
  }

  const handleColor = (color: string) => {
    console.log('color', color);
    saveLocalStorageData();
  }

  return(
    <div>
      <Select 
        defaultValue="Deadline" 
        style={{ width: 120 }} 
        onChange={handleChange}>
          <Option value="Deadline">Deadline</Option>
          <Option value="Test">Test</Option>
      </Select>
      <Radio.Group 
        defaultValue="Text" 
        onChange={handleStyleProperty}
        >
        <Radio.Button value="Text">Text</Radio.Button>
        <Radio.Button value="Background">Background</Radio.Button>
      </Radio.Group>
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