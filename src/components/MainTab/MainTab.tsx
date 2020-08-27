import React , { useEffect , useState } from "react";
import { Tabs } from 'antd';
import MainTable from "../TableView/TableView";
import CalendarView from "../CalendarView/CalendarView";
import axios from "axios";
import { urlApi } from "../../data/const";
import { EventData } from "../types";
import { connect } from 'react-redux';


import './MainTab.scss'
import TableView from "../TableView/TableView";

const MainTab: React.FC = () => {
    const { TabPane } = Tabs;
    const [allEventsData, setAllEventsData] = useState<EventData[]>([]);
    const [loaderState, setLoaderState] = useState(true);
    useEffect(() => {
        axios.get(`${urlApi}/events`).then((res) => {
            setAllEventsData(res.data);
            setLoaderState(false);
        }).catch(() => {
            setLoaderState(false);
        })
    },[]);
    return (
        <section className='main_tab_section'>
            <Tabs type="card">
                <TabPane tab="TABLE" key="1">
                    <TableView allEventsData={allEventsData} loaderState={loaderState}/>
                </TabPane>
                <TabPane tab="CALENDAR" key="2">
                    <CalendarView />
                </TabPane>
                <TabPane tab="LIST" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
       </section>
    )
}

export default MainTab;
