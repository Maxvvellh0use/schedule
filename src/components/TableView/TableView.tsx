import React , { ReactText , useEffect , useState} from "react";
import { Table, Tag, Menu, Dropdown, Checkbox, Button } from 'antd';
import { useDispatch , useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import {EventData , NameEventType , RootStateType} from "../types";
import { getCorrectTime } from "./helpers/getCorrectTime";
import { getCorrectDate } from "./helpers/getCorrectDate";
import { getCorrectDeadline } from "./helpers/getCorrectDeadline";
import { getEventsData } from "../../redux/actions";
import {
    columnNames ,
    deadlineColor ,
    defaultColumnsVisible ,
    defaultColumnsWidths ,
    filtersType ,
    taskColor
} from "./consts";
import { ResizableTitle } from "../ResizableTitle/ResizableTitle";
import { getNewVisibility } from "./helpers/getNewVisibility";
import { ActionPanel } from "./ActionPanel/ActionPanel";

import './TableView.scss';
import {getRowEventsClasses} from "./helpers/getRowEventsClasses";

interface RootState {
    allEventsData: EventData[];
    app: {
        loading: boolean,
        errorText: string,
    },
    tableColorStyle: {[key: string]: object}
}

const TableView: React.FC = () => {
    const dispatch = useDispatch();
    const mode = useSelector<RootStateType, string>(state => state.app.mode);
    const language = useSelector<RootStateType, string>(state => state.app.language);
    const errorText = useSelector<RootState, string>(state => state.app.errorText);
    const allEventsData = useSelector<RootState, EventData[]>(state => state.allEventsData);
    const loading = useSelector<RootState, boolean>(state => state.app.loading);
    const tableColorStyle = useSelector<RootState, {[key: string]: object}>(state => state.tableColorStyle);
    
    const columnsVisibilityBtn = (language === 'eng') ? 'Columns Visibility' : 'Видимость Колонок';
      
    useEffect(() => {
        dispatch(getEventsData());
    }, [dispatch]);
    const [columnsVisible, setColumnsVisible] = useState(localStorage.columnsVisible ?
        JSON.parse(localStorage.columnsVisible) : defaultColumnsVisible);
    const [columnsWidths, setColumnsWidths] = useState(defaultColumnsWidths);
    const [rowSelect, setRowSelect] = useState<ReactText[]>([]);
    const newSelectRows = (newRowSelect: ReactText[]) => {
        setRowSelect(newRowSelect);
    }

    localStorage.columnsVisible = localStorage.columnsVisible ?
        JSON.stringify(columnsVisible) : JSON.stringify(defaultColumnsVisible);

    const colorHandler = (childrenElement:  JSX.Element[] | JSX.Element, eventType: string) => {
        return {
            children: childrenElement,
            props: {
                style: tableColorStyle[eventType],
            }
          }
    };

    const columnsTable = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: columnsWidths['Date'],
            visibility: columnsVisible['Date'],
            render: (text: string, record: {type: string}) => {
                const child = <div>{text}</div>;
                return colorHandler(child, record.type);
            },
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            width: columnsWidths['Time'],
            visibility: columnsVisible['Time'],
            render: (text: string, record: {type: string}) => {
                const child = <div>{text}</div>;
                return colorHandler(child, record.type);
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: columnsWidths['Type'],
            visibility: columnsVisible['Type'],
            filters: filtersType,
            onFilter: (value: string, record: any) => record.type.indexOf(value) === 0,
            render: (text: string, record: {type: string}) => {
                const child = <div>{text}</div>;
                return colorHandler(child, record.type);
            },
        },
        {
            title: 'Place',
            dataIndex: 'place',
            key: 'place',
            width: columnsWidths['Place'],
            visibility: columnsVisible['Place'],
            render: (text: string, record: {type: string}) => {
                const child = <div>{text}</div>;
                return colorHandler(child, record.type);
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: columnsWidths['Name'],
            visibility: columnsVisible['Name'],
            render: (name: NameEventType, record: {type: string}) => {
                const child = <Link to={`/task/${name._id}`}>{name.text}</Link>;
                return colorHandler(child, record.type);
            },

        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            width: columnsWidths['Duration'],
            visibility: columnsVisible['Duration'],
            render: (text: string, record: {type: string}) => {
                const child = <div>{text}</div>;
                return colorHandler(child, record.type);
            },
        },
        {
            title: 'Result',
            dataIndex: 'result',
            key: 'result',
            width: columnsWidths['Result'],
            visibility: columnsVisible['Result'],
            render: (text: string, record: {type: string}) => {
                const child = <div>{text}</div>;
                return colorHandler(child, record.type);
            },
        },
        {
            title: 'Notate',
            dataIndex: 'notate',
            key: 'notate',
            width: columnsWidths['Notate'],
            visibility: columnsVisible['Notate'],
            render: (text: string, record: {type: string}) => {
                const child = <div>{text}</div>;
                return colorHandler(child, record.type);
            },
        },
        {
            title: 'Materials',
            dataIndex: 'materials',
            key: 'materials',
            ellipsis: true,
            width: columnsWidths['Materials'],
            visibility: columnsVisible['Materials'],
            render: (text: string, record: {type: string}) => {
                const child = <a href={text}>{text}</a>;
                return colorHandler(child, record.type);
            },
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            key: 'deadline',
            width: columnsWidths['Deadline'],
            visibility: columnsVisible['Deadline'],
            render: (text: string, record: {type: string}) => {
                const child = <div>{text}</div>;
                return colorHandler(child, record.type);
            },
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            width: columnsWidths['Tags'],
            visibility: columnsVisible['Tags'],
            render: (tags: string[], record: {type: string}) => {
                const child = tags.map(tag =>
                                <Tag color={tag === 'deadline' ? deadlineColor : taskColor}
                                     key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>);
                return colorHandler(child, record.type);
            },
        },
        mode === 'mentor' ?
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: columnsWidths['Action'],
            visibility: true,
            render: (action: { _id: number, key: number }) =>
            <ActionPanel
                currentEvent={action}
                setTableData={setTableData}
                tableData={tableData}
            />,
        } : {},
    ];

   const components = {
        header: {
            cell: ResizableTitle,
        },
    };

    const handleResize = (title: string) => (e: any , sizeNode: { size: { width: number } }) => {
        const nextColumnsWidths = Object.assign({}, columnsWidths);
        nextColumnsWidths[title] = sizeNode.size.width;
        setColumnsWidths(nextColumnsWidths);
    };

    const [tableData, setTableData] = useState();

    const initialTableData = allEventsData.length ? allEventsData.map((event, index) => {
        return {
            key: event._id,
            dateString: event.optional.date,
            date: getCorrectDate(event.optional.date),
            time: getCorrectTime(event.optional.date),
            type: event.type,
            place: event.optional.place,
            name: {
                text: event.name,
                link: event.optional.description,
                _id: event._id

            },
            action: {
                _id: event._id,
                key: index,
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
    };

    const hideRows = () => {
        setTableData(tableData.filter((elem: { key: number }) =>
            !rowSelect.includes(elem.key)));
    }

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

    const columns = columnsTable.map((col: any) => ({
        ...col,
        onHeaderCell: () => ({
            width: columnsWidths[col.title],
            onResize: handleResize(col.title),
            }),
        })
    );

    const showAllRows = () => {
        setTableData(initialTableData);
    }

    const tableView = errorText ? <div>{errorText}</div> :
        <Table components={components}
               rowClassName={(record) => getRowEventsClasses(record)}
               columns={columns.filter(column => column.visibility)}
               rowSelection={{
                   checkStrictly: true,
                   onChange: newSelectRows,
                   selections: [
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
                        <Button>{columnsVisibilityBtn}</Button>
                    </Dropdown>
                </div>
                { tableView }
            </section>
        </main>
    )
}

export default TableView;
