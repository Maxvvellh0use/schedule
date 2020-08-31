import React, { useState } from 'react';
import {
  Form,
  Input,
} from 'antd';
import 'antd/dist/antd.css';
import { MinusCircleOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';

import MapComponent from '../MapComponent/MapComponent';

import './AddressContainer.scss';



const AddressContainer: React.FC = () => {
  const [address, setAddress] = useState('');

  function onMarkerMove(value: string) {
    console.log(value)
    setAddress(value);    
    console.log(address)
  }

  return (
    <>
      <Form.Item
        name="place"
        label="Event address or coordinates">
        <Input
          placeholder="Enter address or choose coordinates on the map below"
          value={address}/>
      </Form.Item>
      <MapComponent onMarkerMove={onMarkerMove} />
    </>
  )
}

export default AddressContainer;