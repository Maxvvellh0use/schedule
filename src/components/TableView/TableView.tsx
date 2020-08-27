import React , {useEffect} from "react";
import { EventData , NameEventType } from "../types";
import { Table, Spin } from 'antd';
import { getCorrectTime } from "./helpers/getCorrectTime";
import { getCorrectDate } from "./helpers/getCorrectDate";
import { getCorrectDeadline } from "./helpers/getCorrectDeadline";
import { Document, Page } from '@react-pdf/renderer'
import { connect } from 'react-redux';
import { setEventsData } from "../../redux/actions";

import './TableView.scss';
import { SystemState } from "../../redux/types";

interface Props {
    allEventsData: EventData[];
    loaderState: boolean,
    setEventsData: any,
}

const TableView: React.FC<Props> = ({ allEventsData, loaderState, setEventsData }) => {
    const errorText = 'Error data request!';
    useEffect(() => {
        setEventsData(allEventsData);
    }, [setEventsData, allEventsData])
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
            deadline: getCorrectDeadline(event.optional.deadline),
        };
    });

    const loader = <Spin size="large" />;
    return (
        <main>
            <Document>
                <Page>
                    <section className='main_table_section'>
                        {loaderState ? <div className='loader_table__container'>{loader}</div>
                            : <Table columns={columnsTable} dataSource={tableEventsData} /> || errorText}
                    </section>
                </Page>
            </Document>
        </main>
    )
}

export default connect(null, {setEventsData})(TableView);
