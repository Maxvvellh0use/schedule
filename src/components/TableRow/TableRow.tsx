import React from "react";
import { Event } from "../types";
import './table-row.scss';
import { getCorrectTime } from "./helpers/getCorrectTime";
import { getCorrectDate } from "./helpers/getCorrectDate";

interface Props {
    event: Event
}

const TableRow: React.FC<Props> = ({event}) => {
    const time = getCorrectTime(event.optional.date);
    const date = getCorrectDate(event.optional.date);
    return (
        <section className='table_section'>
            <div className='row_event_container'>
                <div className='event_row event_date'>{date}</div>
                <div className='event_row event_time'>{time}</div>
                <div className='event_row event_type'>{event.type}</div>
                <div className='event_row event_place'>{event.optional.place}</div>
                <div className='event_row event_name'>
                    <a href={event.optional.description}>{event.name}</a>
                </div>
                <div className='event_row event_materials'>{event.optional.materials}</div>
                <div className='event_row event_deadline'>{event.optional.deadline}</div>
            </div>
        </section>
    )
}

export default TableRow;
