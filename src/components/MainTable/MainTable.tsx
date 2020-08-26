import React from "react";
import { EventData , NameEventType } from "../types";
import './main-table.scss';
import { Table, Spin } from 'antd';
import { getCorrectTime } from "./helpers/getCorrectTime";
import { getCorrectDate } from "./helpers/getCorrectDate";

interface Props {
    allEventsData: EventData[];
    loaderState: boolean,

}

const MainTable: React.FC<Props> = ({ allEventsData, loaderState }) => {
    const errorText = 'Error data request!';
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

    const tableEventsData = allEventsData.map((event) => {
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
            deadline: event.optional.deadline,
        };
    });

    const loader = <Spin size="large" />;
    return (
        <main>
            <section className='main_table_section'>
                    {loaderState ? <div className='loader_table__container'>{loader}</div>
                        : <Table columns={columnsTable} dataSource={tableEventsData} /> || errorText}
            </section>
        </main>
    )
}

export default MainTable;
