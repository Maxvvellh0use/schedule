import React, { useState, useEffect } from 'react';
import { Select, Radio, Button } from 'antd';
import { SliderPicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import { getTableColors } from '../../redux/actions'

import './user-color-settings.scss';
import { RootStateType } from '../types';

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
  const accessability = useSelector<RootStateType, boolean>(state => state.app.accessability);

  useEffect(() => {
    handleColor()
    dispatch(getTableColors());
  }, [color])

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

  const setDefaultColors = () => {
    const defaultColors = {};
    localStorage.setItem(task, JSON.stringify(defaultColors));
    if( property === 'color' ) {
      setColor('#595959')
    } else { setColor('#ffffff') }
  }

  const events = eventsData.map(event =>  <Option value={event} key={event}>{event}</Option>)

  return(
    <div className={accessability ? 'accessability-on' : ''}>
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
      <div className="color-swatch" style={{
        backgroundColor: color 
      }}>
        { defaultColorMessage }
     </div>
      <SliderPicker 
        color={color}
        onChangeComplete={ (color) => {
          setColor(color.hex)
        }
      }/>
     <div className="default-colors"> 
       <p className="default-colors__annotation">Set default colors:</p>
       <Button onClick={ setDefaultColors } type="primary">Default colors</Button>
     </div>
    </div>
  )
}

export default UserColorSettings