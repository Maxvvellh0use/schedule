import React from 'react';
import { Select } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const Timezone = (props) => {
  console.log(props.zones.defaultZone );
    const zoneItem = props.zones.zones.map(i => {
    return <Option value= { i.value } toCount = { i.toCount } key = { i.id } > { i.value }  </Option>
    })
      
      return (
          <div>
            {/* <Select defaultValue={ localStorage.getItem('timezone') ? 
              localStorage.getItem('timezone') : localStorage.setItem('timezone', 'UTC+2') } style={{ width: 120 }} onChange={props.changeTimeZone}>
                { zoneItem }
            </Select> */}

            <Select defaultValue={ localStorage.getItem('timezone') || props.zones.defaultZone.value } style={{ width: 120 }} onChange={props.changeTimeZone}>
                { zoneItem }
            </Select>
          </div>
      )
}

export default Timezone;
