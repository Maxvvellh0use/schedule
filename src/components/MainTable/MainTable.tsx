import React , {useEffect , useState} from "react";
import axios from 'axios';
import { urlApi } from "../../data/const";
import { Event } from "../types";
import './main-table.scss';
import loaderThreeDots from '../../assets/img/svg/loaders/three-dots.svg';
import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';
import { columnsTable } from "./consts";
import { getCorrectTime } from "./helpers/getCorrectTime";
import { getCorrectDate } from "./helpers/getCorrectDate";


const MainTable: React.FC = () => {
    const [allEventsState, setAllEventsState] = useState<Event[]>([]);
    const [loaderState, setLoaderState] = useState(true);
    const [errorText, setErrorText] = useState('');
    useEffect(() => {
        axios.get(`${urlApi}/events`).then((res) => {
            setAllEventsState(res.data);
            setLoaderState(false);
        }).catch(() => {
            setLoaderState(false);
            setErrorText('Error data request!');
        })
    },[]);
    const tableEventsData = allEventsState.map((event) => {
        return {
            key: event.id,
            date: getCorrectDate(event.optional.date),
            time: getCorrectTime(event.optional.date),
            type: event.type,
            place: event.optional.place,
            name: event.name,
            materials: event.optional.materials,
            deadline: event.optional.deadline,
        };
    });
    const loader = <img className='loader_table' src={loaderThreeDots} alt='Загрузка...'/>;
    return (
        <main>
            <section className='main_table_section'>
                    {loaderState ? <div className='loader_table__container'>{loader}</div>
                        : <Table columns={columnsTable} dataSource={tableEventsData} /> || errorText}
            </section>
        </main>
    )
}

export default MainTable;
