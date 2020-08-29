import React , {EventHandler , useEffect , useState} from "react";
import { Table, Spin, Menu, Dropdown, Checkbox, Button } from 'antd';
import { useDispatch , useSelector } from 'react-redux';

import { EventData , NameEventType } from "../types";
import { getCorrectTime } from "./helpers/getCorrectTime";
import { getCorrectDate } from "./helpers/getCorrectDate";
import { getCorrectDeadline } from "./helpers/getCorrectDeadline";
import { getEventsData } from "../../redux/actions";

import './TableView.scss';
import { columnNames , defaultColumnsVisible } from "./consts";

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
    }, [dispatch]);
    const [columnsVisible, setColumnsVisible] = useState(localStorage.columnsVisible ?
        JSON.parse(localStorage.columnsVisible) : defaultColumnsVisible);
    localStorage.columnsVisible = localStorage.columnsVisible ?
        JSON.stringify(columnsVisible) : JSON.stringify(defaultColumnsVisible);
    const columnsTable = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            visible: columnsVisible['Date']
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            visible: columnsVisible['Time']
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            visible: columnsVisible['Type'],
        },
        {
            title: 'Place',
            dataIndex: 'place',
            key: 'place',
            visible: columnsVisible['Place'],
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name: NameEventType) => <a href={name.link}>{name.text}</a>,
            visible: columnsVisible['Name'],
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            visible: columnsVisible['Duration'],
        },
        {
            title: 'Result',
            dataIndex: 'result',
            key: 'result',
            visible: columnsVisible['Result'],
        },
        {
            title: 'Notate',
            dataIndex: 'notate',
            key: 'notate',
            visible: columnsVisible['Notate'],
        },
        {
            title: 'Materials',
            dataIndex: 'materials',
            key: 'materials',
            ellipsis: true,
            render: (material: string) => <a href={material}>{material}</a>,
            visible: columnsVisible['Materials'],
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            key: 'deadline',
            visible: columnsVisible['Deadline'],
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            visible: columnsVisible['Action'],
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
            duration: event.optional.duration,
            result: event.optional.result,
            notate: event.optional.notate,
            materials: event.optional.materials,
            deadline: getCorrectDeadline(event.optional.deadline),
            description: event.optional.details,
        };
    }) : undefined;

    const tableView = errorText ? <div>{errorText}</div> :
        <Table columns={columnsTable.filter((column) => column.visible)}
               expandable={{
                   expandedRowRender: record => <span>{record.description}</span> ,
               }}
               dataSource={tableEventsData} />;

    const loader = <Spin size="large" />;

    const hideColumn = (columnName: string) => {
        const newColumnsVisible = Object.assign({}, columnsVisible);
        newColumnsVisible[columnName] = !newColumnsVisible[columnName];
        setColumnsVisible(newColumnsVisible);
    };

    const menu = (
        <Menu>
            {
                columnNames.map(columnName =>
                <Menu.Item>
                    <Checkbox checked={columnsVisible[columnName]} onChange={() => hideColumn(columnName)}>
                        {columnName}
                    </Checkbox>
                </Menu.Item>
            )}
        </Menu>
    );

    return (
        <main>
            <section className='main_table_section'>
                <div className='dropdown_container'>
                    <Dropdown className='dropdown_columns_visible' overlay={menu} placement="bottomLeft">
                        <Button>Columns Visible</Button>
                    </Dropdown>
                </div>

                {
                    loading ? <div className='loader_table__container'>{loader}</div> :
                        tableView
                }
            </section>
        </main>
    )
}

export default TableView;
