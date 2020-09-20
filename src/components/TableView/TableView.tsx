import React , {EffectCallback , ReactText , useEffect , useState} from "react";
import { Table, Tag, Menu, Dropdown, Checkbox, Button } from 'antd';
import { useDispatch , useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { EventData , EventDataTable , NameEventType , RootStateType } from "../types";
import { getCorrectTime } from "./helpers/getCorrectTime";
import { getCorrectDate } from "./helpers/getCorrectDate";
import { getCorrectDeadline } from "./helpers/getCorrectDeadline";
import { getEventsData } from "../../redux/actions";
import {
    columnNames ,
    defaultColumnsVisible ,
    defaultColumnsWidths , defaultPageNumber , filtersCourse ,
    filtersType ,
} from "./consts";
import { ResizableTitle } from "../ResizableTitle/ResizableTitle";
import { getNewVisibility } from "./helpers/getNewVisibility";
import { ActionPanel } from "./ActionPanel/ActionPanel";
import { getRowEventsClasses } from "./helpers/getRowEventsClasses";
import { getTypeColor } from "./helpers/getTypeColor";

import './TableView.scss';
import {getTodayEvents} from "./helpers/getPageTodayEvents";
import value from "*.png";



const TableView: React.FC = () => {
    const dispatch = useDispatch();
    const mode = useSelector<RootStateType, string>(state => state.app.mode);
    const language = useSelector<RootStateType, string>(state => state.app.language);
    const errorText = useSelector<RootStateType, string>(state => state.app.errorText);
    const allEventsData = useSelector<RootStateType, EventData[]>(state => state.allEventsData);
    const loading = useSelector<RootStateType, boolean>(state => state.app.loading);
    const tableColorStyle = useSelector<RootStateType, {[key: string]: object}>(state => state.tableColorStyle);
    const [tablePage, setTablePage] = useState<number | undefined>(undefined);
    const defaultZone = useSelector<RootStateType, string>(state => state.timezone.defaultZone);
    const activeZone = useSelector<RootStateType, any>(state => state.timezone.activeZone);
    const columnsVisibilityBtn = (language === 'eng') ? 'Columns Visibility' : 'Видимость Колонок';
    const [tablePage, setTablePage] = useState<number | undefined>(undefined);
    useEffect(() => {
        dispatch(getEventsData());
    }, [dispatch])

    useEffect(() => {
        if (allEventsData.length && !tablePage) {
            setTablePage(getTodayEvents(allEventsData));
        }
    }, [dispatch, allEventsData, tablePage]);

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

    const colorRender = (text: string, record: {type: string}) => {
        const child = <div>{text}</div>;
        return colorHandler(child, record.type);
    }

    const columnsTable = [
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
            width: columnsWidths['Course'],
            visibility: columnsVisible['Course'],
            filters: filtersCourse,
            onFilter: (value: string, record: any) => record.course.indexOf(value) === 0,
            render: colorRender
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: columnsWidths['Date'],
            visibility: columnsVisible['Date'],
            render: colorRender,
            fixed: 'left',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            width: columnsWidths['Time'],
            visibility: columnsVisible['Time'],
            render: colorRender
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
                const child = <Tag color={getTypeColor(text)}>{text.toUpperCase()}</Tag>;
                return colorHandler(child, record.type);
            },
        },
        {
            title: 'Place',
            dataIndex: 'place',
            key: 'place',
            width: columnsWidths['Place'],
            visibility: columnsVisible['Place'],
            render: colorRender
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
            render: colorRender
        },
        {
            title: 'Result',
            dataIndex: 'result',
            key: 'result',
            width: columnsWidths['Result'],
            visibility: columnsVisible['Result'],
            render: colorRender
        },
        {
            title: 'Notate',
            dataIndex: 'notate',
            key: 'notate',
            width: columnsWidths['Notate'],
            visibility: columnsVisible['Notate'],
            render: colorRender
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
            render: colorRender
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

    const [tableData, setTableData] = useState<EventDataTable[] | undefined>();
    const chosenDate = useSelector<RootStateType, string>(state => state.app.date);

    const initialTableData: EventDataTable[] | undefined  = allEventsData.length ? allEventsData.map((event, index) => {
        return {
            key: event._id,
            _id: event._id,
            dateString: event.optional.date,
            course: event.course,
            date: getCorrectDate(event.optional.date, defaultZone, activeZone),
            time: getCorrectTime(event.optional.date, defaultZone, activeZone),
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
            deadline: getCorrectDeadline(event.optional.deadline, defaultZone, activeZone),
            description: event.optional.details,
        };
    }) : undefined;

    useEffect(() => {

        if (!loading && initialTableData) {

            setTableData(initialTableData);
        }
    }, [loading, allEventsData])

    useEffect(() => {
        if (!loading && chosenDate && initialTableData ) {
            setTableData(initialTableData.filter((el) => el.date === chosenDate));
        }
    }, [chosenDate])

    const hideColumn = (columnName: string) => {
        const updateColumnsVisibility =
            getNewVisibility(columnsTable, columnsVisible, columnName);
        setColumnsVisible(updateColumnsVisibility.newColumnsVisible);
    };

    const hideRows = () => {
        if (tableData) {
            setTableData(tableData.filter((elem: { key: number }) =>
            !rowSelect.includes(elem.key)));
        }
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
        <Table className = 'table-view'
            components={components}
               pagination={{
                   current: tablePage ? tablePage : defaultPageNumber,
                   onChange: (value: number) => setTablePage(value),
               }}
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
