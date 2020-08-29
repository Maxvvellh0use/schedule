import React , {useEffect} from "react";
import { Table, Spin } from 'antd';
import { useDispatch , useSelector } from 'react-redux';

import { EventData , NameEventType } from "../types";
import { getCorrectTime } from "./helpers/getCorrectTime";
import { getCorrectDate } from "./helpers/getCorrectDate";
import { getCorrectDeadline } from "./helpers/getCorrectDeadline";
import { getEventsData } from "../../redux/actions";

import './TableView.scss';

interface RootState {
    allEventsData: EventData[];
    app: {
        loading: boolean,
        errorText: string,
    },
}

const TableView: React.FC = () => {
    const dispatch = useDispatch();
    const errorText = useSelector<RootState, string>(state => state.app.errorText);
    const allEventsData = useSelector<RootState, EventData[]>(state => state.allEventsData);
    const loading = useSelector<RootState, boolean>(state => state.app.loading);
    useEffect(() => {
        dispatch(getEventsData());
    }, [dispatch])
    const columnsTable = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Place',
            dataIndex: 'place',
            key: 'place',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name: NameEventType) => <a href={name.link}>{name.text}</a>,
        },
        {
            title: 'Materials',
            dataIndex: 'materials',
            key: 'materials',
            ellipsis: true,
            render: (material: string) => <a href={material}>{material}</a>,
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            key: 'deadline',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
    ];

    const tableEventsData = allEventsData.length ? allEventsData.map((event) => {
        return {
            key: event.id,
            date: getCorrectDate(event.optional.date),
            time: getCorrectTime(event.optional.date),
            type: event.type,
            place: event.optional.place,
            name: {
                text: event.name,
                link: event.optional.description,
            },
            materials: event.optional.materials,
            deadline: getCorrectDeadline(event.optional.deadline),
        };
    }) : undefined;
    const tableView = errorText ? <div>{errorText}</div> :
        <Table columns={columnsTable} dataSource={tableEventsData} />;
    const loader = <Spin size="large" />;
    return (
        <main>
            <section className='main_table_section'>
                {
                    loading ? <div className='loader_table__container'>{loader}</div> :
                        tableView
                }
            </section>
        </main>
    )
}

export default TableView;
