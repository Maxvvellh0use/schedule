import React from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../types";
import { changeTimezoneActCreator } from "../../../redux/actions";

const { Option } = Select;

const Timezone = () => {
    const dispatch = useDispatch();
    const zones = useSelector<RootStateType, any>(state => state.timezone.zones);


    const zoneItem = zones.map((zone: string, index: number) => {
    return <Option value= { zone } key = { index } > { zone }  </Option>
    })

      return (
          <div>
            <Select defaultValue={ localStorage.getItem('timezone')
            || zones.defaultZone }
                    style={{ width: 250 }}
                    onChange={() => dispatch(changeTimezoneActCreator(zoneItem))}>
                { zoneItem }
            </Select>
          </div>
      )
}

export default Timezone;
