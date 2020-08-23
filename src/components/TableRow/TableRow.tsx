import React from "react";
import { Event } from "../types";
import './table-row.scss';

interface Props {
    event: Event
}

const TableRow: React.FC<Props> = ({event}) => {
    return (
        <section className='table_section'>
            <div className='row_event_container'>
                <div className='event_row event_date'>{event.optional.date}</div>
                <div className='event_row event_description'>{event.optional.description}</div>
                <div className='event_row event_type'>{event.type}</div>
                <div className='event_row event_place'>{event.optional.place}</div>
                <div className='event_row event_name'>{event.name}</div>
                <div className='event_row event_materials'>{event.optional.materials}</div>
                <div className='event_row event_deadline'>{event.optional.deadline}</div>
            </div>
        </section>
    )
}

export default TableRow;
