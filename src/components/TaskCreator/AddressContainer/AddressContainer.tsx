import React, { useState } from 'react';
import {
  Form,
  Input,
} from 'antd';
import 'antd/dist/antd.css';
import { MinusCircleOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';

import MapComponent from '../MapComponent/MapComponent';

import './AddressContainer.scss';

interface Props {
  onMarkerMove: Function;
}

const AddressContainer: React.FC<Props> = ({onMarkerMove}) => {
  return (
    <>       
      <Form.Item
        name="place"
        label="Event address or coordinates"
        shouldUpdate={true}        
        >
        <Input placeholder="Enter address or choose coordinates on the map below"/>
      </Form.Item>
      <MapComponent onMarkerMove={onMarkerMove} coordinates={undefined}/>
    </>
  )
}

export default AddressContainer;