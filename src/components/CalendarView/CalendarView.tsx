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
import {Link} from "react-router-dom";

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
                                <Link className='month_deadline_link' to={`/task/${eventData._id}`}>{eventData.text}</Link>
                                    :
                                <Link to={`/task/${eventData._id}`}>{eventData.text}</Link>
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
                        <Link className='event_day_link'
                              to={`/task/${item._id}`}>
                            <Badge style={{color: linkColor}}
                                   status={item.type}
                                   text={item.content} />
                        </Link>
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
