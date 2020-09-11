import React, { useState, useEffect } from 'react';
import { Select, Radio, Button } from 'antd';
import { SliderPicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import { getTableColors } from '../../redux/actions'

import './user-color-settings.scss';


interface Events {
  eventsData: string[];
}

interface State {
  app: {
    language: string
  }
}

const { Option } = Select;

const UserColorSettings: React.FC<Events> = ({eventsData}) => {
  
  const language = useSelector<State, string>(state => state.app.language);
  const events = eventsData.map(event =>  <Option value={event} key={event}>{event}</Option>)
  const taskPropertyTitle = (language === 'eng') ? 'Select task' : 'Выберите задание';
  const propertySelector = (language === 'eng') ? 'Select property' : 'Выберите свойство';
  const textColorProperty = (language === 'eng') ? 'Text' : 'Текст';
  const backgroundColorProperty = (language === 'eng') ? 'Background' : 'Фон';
  const colorPropertyTitle = (language === 'eng') ? 'Select color' : 'Выберите цвет';
  const colorExample = (language === 'eng') ? 'Color example' : 'Образец цвета';
  const defaultColorDescription = (language === 'eng') ? 'Set default colors:' : 'Установить начальные цвета:';
  const defaultColorBtn = (language === 'eng') ? 'Default colors' : 'Базовые цвета';
  const [color, setColor] = useState('#eeeeee');
  const [property, setProperty] = useState('color');
  const [task, setTask] = useState('Deadline');
  const dispatch = useDispatch();
  
  const defaultColorMessage = (color === '#eeeeee') ? <p>{colorExample}</p> : null;

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

  return(
    <div>
      <p className="color-settings-title">{taskPropertyTitle}</p>
      <Select 
        getPopupContainer={trigger => trigger.parentNode}
        defaultValue="Deadline" 
        style={{ width: 120 }} 
        onChange={handleChange}>
          {events}
      </Select>
      <p className="color-settings-title">{propertySelector}</p>
      <Radio.Group 
        defaultValue="color" 
        onChange={handleStyleProperty}
        >
        <Radio.Button value="color">{textColorProperty}</Radio.Button>
        <Radio.Button value="backgroundColor">{backgroundColorProperty}</Radio.Button>
      </Radio.Group>
      <p className="color-settings-title">{colorPropertyTitle}</p>
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
       <p className="default-colors__annotation">{defaultColorDescription}</p>
       <Button onClick={ setDefaultColors } type="primary">{defaultColorBtn}</Button>
     </div>
    </div>
  )
}

export default UserColorSettings