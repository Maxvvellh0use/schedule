import React, { ReactText } from "react";
import { Button , message , Popconfirm } from "antd";
import { DeleteOutlined , EditOutlined } from "@ant-design/icons";
import axios from 'axios'

import { urlApi } from "../../../data/const";
import {RootStateType , TableData} from "../../types";

import './ActionPanel.scss';
import {useDispatch , useSelector} from "react-redux";

interface Props {
    currentEvent: {
        _id: number,
        key: number
    }
    setTableData: React.Dispatch<TableData[]>,
    tableData: TableData[];
}

export const ActionPanel: React.FC<Props> = ({currentEvent, setTableData, tableData}) => {

    const mode = useSelector<RootStateType, string>(state => state.app.mode);

    const removeRow = (removeKey: number) => {
        setTableData(tableData.filter((elem: { key: number }) =>
            elem.key !== removeKey));
    }

    const confirmDeletion = async (e: any) => {
        message.success('Click on Yes');
        await axios.delete(`${urlApi}/remove_event/${currentEvent._id}`).catch(e => console.error(e));
        removeRow(currentEvent.key);
    }

    const cancelDeletion = (e: any) => {
        console.log(e);
        message.error('Click on No');
    }

    return (
        <div className='action_panel'>
            {
                mode === 'mentor' ? <Button
                    className="task-btn"
                    type="dashed"
                    shape="circle"
                    icon={<EditOutlined />} /> :
                    null
            }
            <Popconfirm
            title="Are you sure delete this event?"
            onConfirm={confirmDeletion}
            onCancel={cancelDeletion}
            okText="Yes"
            cancelText="No"
            >
            <Button className="task-btn" type="dashed" shape="circle" icon={<DeleteOutlined />} />
            </Popconfirm>
        </div>
    )
}
