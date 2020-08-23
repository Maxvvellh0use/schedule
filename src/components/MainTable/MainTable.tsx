import React , {useEffect , useState} from "react";
import { connect } from 'react-redux'
import axios from 'axios';
import { urlApi } from "../../data/const";
import TableRow from "../TableRow/TableRow";
import { Event } from "../types";
import './main-table.scss';
import '../TableRow/table-row.scss';
import loaderThreeDots from '../../assets/img/svg/loaders/three-dots.svg';

const MainTable: React.FC = () => {
    const [allEventsState, setAllEventsState] = useState<Event[]>([]);
    const [loaderState, setLoaderState] = useState(true);
    useEffect(() => {
        axios.get(`${urlApi}/events`).then((res) => {
            setAllEventsState(res.data);
            setLoaderState(false);
        }).catch((e) => console.log(e))
    },[])
    const eventRows = allEventsState.length ? allEventsState.map((event) =>
            <TableRow event={event} />) : null;
    const loader = <img className='loader_table' src={loaderThreeDots} alt='Загрузка...'/>;
    return (
        <main>
            <section className='main_table_section'>
                <div>
                    <div className='table_header_container'>
                        <div className='event_header event_date'>Date</div>
                        <div className='event_header event_description'>Description</div>
                        <div className='event_header event_type'>Type</div>
                        <div className='event_header event_place'>Place</div>
                        <div className='event_header event_name'>Name</div>
                        <div className='event_header event_materials'>Materials</div>
                        <div className='event_header event_deadline'>Deadline</div>
                    </div>
                    {loaderState ? <div className='loader_table__container'>{loader}</div> : eventRows}
                </div>
            </section>
        </main>
    )
}

export default MainTable;
