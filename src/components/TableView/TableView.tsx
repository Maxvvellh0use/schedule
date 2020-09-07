import React , { ReactText , useEffect , useState} from "react";
import { Table, Tag, Menu, Dropdown, Checkbox, Button } from 'antd';
import { useDispatch , useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { EventData , NameEventType } from "../types";
import { getCorrectTime } from "./helpers/getCorrectTime";
import { getCorrectDate } from "./helpers/getCorrectDate";
import { getCorrectDeadline } from "./helpers/getCorrectDeadline";
import { getEventsData } from "../../redux/actions";
import {columnNames , deadlineColor , defaultColumnsVisible , filtersType , taskColor} from "./consts";
import { ResizableTitle } from "../ResizableTitle/ResizableTitle";
import { getNewVisibility } from "./helpers/getNewVisibility";

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
    }, [dispatch]);
    const [columnsVisible, setColumnsVisible] = useState(localStorage.columnsVisible ?
        JSON.parse(localStorage.columnsVisible) : defaultColumnsVisible);
    const [rowSelect, setRowSelect] = useState<ReactText[]>([]);
    const newSelectRows = (newRowSelect: ReactText[]) => {
        setRowSelect(newRowSelect);
    }
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
            filters: filtersType,
            onFilter: (value: string, record: any) => record.type.indexOf(value) === 0,
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
            render: (name: NameEventType) => <Link to={`/task/${name.id}`}>{name.text}</Link>,
            width: 200,
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
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags: string[]) => (
                <>
                    {
                        tags.map(tag =>
                            <Tag color={tag === 'deadline' ? deadlineColor : taskColor}
                                 key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                    )}
                </>
            ),
            width: 100,
            visibility: columnsVisible['Tags'],
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

    const handleResize = (index: number) => (e: any , size: { width: number }) => {
        const nextColumns = [...columnsTable];
        nextColumns[index] = {
            ...nextColumns[index],
            width: size.width,
        };
        setColumnsTable(nextColumns);
    };

    const [tableData, setTableData] = useState();

    const initialTableData = allEventsData.length ? allEventsData.map((event, index) => {
        return {
            key: index,
            date: getCorrectDate(event.optional.date),
            time: getCorrectTime(event.optional.date),
            type: event.type,
            place: event.optional.place,
            name: {
                text: event.name,
                link: event.optional.description,
                id: event.id
            },
            duration: event.optional.duration,
            result: event.optional.result,
            notate: event.optional.notate,
            materials: event.optional.materials,
            deadline: getCorrectDeadline(event.optional.deadline),
            description: event.optional.details,
            tags: event.type === 'Deadline' ? ['deadline'] : [],
        };
    }) : undefined;

    useEffect(() => {
        if (!loading) {
            setTableData(initialTableData);
        }
    }, [loading, allEventsData])

    const hideColumn = (columnName: string) => {
        const updateColumnsVisibility =
            getNewVisibility(columnsTable, columnsVisible, columnName);
        setColumnsVisible(updateColumnsVisibility.newColumnsVisible);
        setColumnsTable(updateColumnsVisibility.newColumnsTable);
    };

    const menu = (
        <Menu>
            {
                columnNames.map((columnName, index) =>
                <Menu.Item key={`${columnName}${index}`}>
                    <Checkbox checked={columnsVisible[columnName]}
                              onChange={() => hideColumn(columnName)}>
                        {columnName}
                    </Checkbox>
                </Menu.Item>
            )}
        </Menu>
    );

    const columns = columnsTable.map((col: any, index: number) => ({
        ...col,
        onHeaderCell: (column: { width: number, visibility: boolean }) => ({
            width: column.width,
            onResize: handleResize(index),
            }),
        })
    );

    const hideRows = () => {
        console.log(rowSelect);
        setTableData(tableData.filter((elem: { key: number }) =>
            !rowSelect.includes(elem.key)));
        setRowSelect([]);
    }


    const showAllRows = () => {
        setTableData(initialTableData);
    }

    const tableView = errorText ? <div>{errorText}</div> :
        <Table components={components}
               columns={columns.filter(column => column.visibility)}
               rowSelection={{
                   checkStrictly: true,
                   onChange: newSelectRows,
                   selections: [
                       Table.SELECTION_ALL,
                       {
                           key: 'hide',
                           text: 'Hide selected rows',
                           onSelect: () => hideRows()
                       },
                       {
                           key: 'show',
                           text: 'Show all rows',
                           onSelect: () => showAllRows()
                       },
                   ]}
               }
               loading={loading}
               dataSource={tableData}
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
