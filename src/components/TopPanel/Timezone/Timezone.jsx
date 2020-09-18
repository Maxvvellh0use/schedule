import React from 'react';
import { Select } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const Timezone = (props) => {
    const zoneItem = props.zones.zones.map(i => {
    return <Option value= { i} key = { i } > { i }  </Option>
    })
      
      return (
          <div>
            <Select defaultValue={ localStorage.getItem('timezone') || props.zones.defaultZone } style={{ width: 250 }} onChange={props.changeTimeZone}>
                { zoneItem }
            </Select>
          </div>
      )
}

export default Timezone;
