import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Form,
  Input,
} from 'antd';
import 'antd/dist/antd.css';
import { MinusCircleOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';

import MapComponent from '../MapComponent/MapComponent';

import './AddressContainer.scss';


interface State {
  app: {
    language: string
  }
}

interface Props {
  onMarkerMove: Function;
}

const AddressContainer: React.FC<Props> = ({onMarkerMove}) => {
  const language = useSelector<State, string>(state => state.app.language);
  const mapLabel = ( language === 'eng') ? "Event address or coordinates" : "Введите адрес или координаты";
  const mapInputPlaceholder = ( language === 'eng') ? "Enter address or choose coordinates on the map below" 
    : "Введите адрес или выберите место на карте ниже";
  return (
    <>       
      <Form.Item
        name="place"
        label={mapLabel}
        shouldUpdate={true}        
        >
        <Input placeholder={mapInputPlaceholder}/>
      </Form.Item>
      <MapComponent onMarkerMove={onMarkerMove} coordinates={undefined}/>
    </>
  )
}

export default AddressContainer;