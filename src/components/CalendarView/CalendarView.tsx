import React from "react";
import { Calendar, Badge } from 'antd';
import { EventData } from "../types";
import {anyIndex , unitOffset} from "./consts";

interface Props {
    allEventsData: EventData[];
}

interface ListTypes {
    type: string,
    content: string,
}

const CalendarView: React.FC<Props> = ({ allEventsData }) => {
    const allEventsDataParseDate = allEventsData.map((event) => {
       return { date: new Date(event.optional.date), name: event.name, type: event.type };
    });
    const getListData = (value: any): any[] => {
        const findEventsDay = allEventsDataParseDate.filter((event) =>
            value.month() === event.date.getMonth() && value.date() === event.date.getDay());
        if (findEventsDay.length) {
            return findEventsDay.map((eventDay) => {
                if (eventDay.type === 'Deadline') {
                    return {type: 'error' , content: eventDay.name}
                }
                return {type: 'success' , content: eventDay.name}
            })
        }
        return [
            {type: '' , content: ''} ,
        ];
    }

    const getMonthData = (value: any) => {
        const findEventsMonth = allEventsDataParseDate.filter((event) =>
            value.month() === event.date.getMonth());
        return findEventsMonth.map((event) => event.name);
    }

    const monthCellRender = (value: any) => {
        const eventsData = getMonthData(value);
        return eventsData ? (
            eventsData.map((eventData, index) => {
                return (
                    <div className="notes-month">
                        <div>{index + unitOffset}. {eventData}</div>
                    </div>
                )
            })
        ) : null
    }

    const dateCellRender = (value: any) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    }
    return (
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
    )
}


export default CalendarView;
