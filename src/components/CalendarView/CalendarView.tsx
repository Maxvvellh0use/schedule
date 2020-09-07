import React from "react";

import './calendar-view.scss';

import { Calendar, Badge } from 'antd';
import { EventData , ListTypes , NameEventType } from "../types";
import { linkColor , unitOffset } from "./consts";
import { parseDateEvent } from "./helpers/parseDateEvent";
import { getCurrentDayEvents } from "./helpers/getCurrentDayEvents";
import { getCurrentMonthEvents } from "./helpers/getCurrentMonthEvents";
import { connect } from 'react-redux';
import { SystemState } from "../../redux/types";

interface Props {
    allEventsData: EventData[];
}

const CalendarView: React.FC<Props> = ({ allEventsData }) => {
    const allEventsDataParseDate = parseDateEvent(allEventsData);

    const getMonthData = (moment: any): NameEventType[]  =>
        getCurrentMonthEvents(moment, allEventsDataParseDate);

    const getListData = (moment: any): ListTypes[] =>
        getCurrentDayEvents(moment, allEventsDataParseDate);

    const monthCellRender = (moment: any) => {
        const eventsData = getMonthData(moment);
        return eventsData ? (
            eventsData.map((eventData, index) => {
                return (
                    <div key={`${eventData.text}${index}`} className="notes-month">
                        <div>{index + unitOffset}.
                            {
                                eventData.type === 'Deadline' ?
                                <a className='month_deadline_link' href={eventData.link}> {eventData.text}</a>
                                    :
                                <a href={eventData.link}> {eventData.text}</a>
                            }
                        </div>
                    </div>
                )
            })
        ) : null
    }

    const dateCellRender = (moment: any) => {
        const listData = getListData(moment);
        return (
            <ul className="calendar_events_list">
                {
                    listData.map((item, index) => (
                    <li className='calendar_events_list__item'
                        key={`${item.content}${index}`}>
                        <a className='event_day_link'
                            href={item.link}>
                            <Badge style={{color: linkColor}}
                                   status={item.type}
                                   text={item.content} />
                        </a>
                    </li>
                ))}
            </ul>
        );
    }
    return (
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
    )
}

const mapStateToProps = (state: SystemState) => ({
    allEventsData: state.allEventsData,
})


export default connect(mapStateToProps)(CalendarView);
