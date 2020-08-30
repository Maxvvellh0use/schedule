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
import {ResizableTitle} from "../ResizableTitle/ResizableTitle";
import {TestTable} from "./testTable";
import {getNewVisibility} from "./helpers/getNewVisibility";

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
    const [columnsTable, setColumnsTable] = useState([
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 120,
            visibility: columnsVisible['Date']
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            width: 50,
            visibility: columnsVisible['Time']
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 70,
            visibility: columnsVisible['Type'],
        },
        {
            title: 'Place',
            dataIndex: 'place',
            key: 'place',
            width: 70,
            visibility: columnsVisible['Place'],
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            render: (name: NameEventType) => <a href={name.link}>{name.text}</a>,
            visibility: columnsVisible['Name'],
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            width: 30,
            visibility: columnsVisible['Duration'],
        },
        {
            title: 'Result',
            dataIndex: 'result',
            key: 'result',
            width: 50,
            visibility: columnsVisible['Result'],
        },
        {
            title: 'Notate',
            dataIndex: 'notate',
            key: 'notate',
            width: 30,
            visibility: columnsVisible['Notate'],
        },
        {
            title: 'Materials',
            dataIndex: 'materials',
            key: 'materials',
            ellipsis: true,
            width: 200,
            render: (material: string) => <a href={material}>{material}</a>,
            visibility: columnsVisible['Materials'],
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            key: 'deadline',
            width: 200,
            visibility: columnsVisible['Deadline'],
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 100,
            visibility: columnsVisible['Action'],
        },
    ]);

   const components = {
        header: {
            cell: ResizableTitle,
        },
    };

    const handleResize = (index: number) => (e: any , {size}: any) => {
        const nextColumns = [...columnsTable];
        nextColumns[index] = {
            ...nextColumns[index],
            width: size.width,
        };
        setColumnsTable(nextColumns);
    };

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

    const hideColumn = (columnName: string) => {
        const updateColumnsVisibility =
            getNewVisibility(columnsTable, columnsVisible, columnName);
        setColumnsVisible(updateColumnsVisibility.newColumnsVisible);
        setColumnsTable(updateColumnsVisibility.newColumnsTable);
    };

    const menu = (
        <Menu>
            {
                columnNames.map(columnName =>
                <Menu.Item>
                    <Checkbox checked={columnsVisible[columnName]}
                              onChange={() => hideColumn(columnName)}>
                        {columnName}
                    </Checkbox>
                </Menu.Item>
            )}
        </Menu>
    );

    const columns = columnsTable.map((col: any , index: number) => ({
        ...col,
        onHeaderCell: (column: { width: any; visibility: boolean;  }) => ({
            width: column.width,
            onResize: handleResize(index),
        }),
        })
    );

    const tableView = errorText ? <div>{errorText}</div> :
        <Table components={components}
               columns={columns.filter(column => column.visibility)}
               rowSelection={{checkStrictly: true, selections: true}}
               loading={loading}
               dataSource={tableEventsData}
               bordered />;

    return (
        <main>
            <section className='main_table_section'>
                <div className='dropdown_container'>
                    <Dropdown className='dropdown_columns_visible'
                              overlay={menu}
                              placement="bottomLeft">
                        <Button>Columns Visibility</Button>
                    </Dropdown>
                </div>
                { tableView }
            </section>
        </main>
    )
}

export default TableView;
