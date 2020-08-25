import React , { useEffect , useState } from "react";
import { Tabs } from 'antd';
import MainTable from "../MainTable/MainTable";
import CalendarView from "../CalendarView/CalendarView";
import axios from "axios";
import { urlApi } from "../../data/const";
import { EventData } from "../types";

const TabView: React.FC = () => {
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
        <Tabs type="card">
            <TabPane tab="TABLE" key="1">
                <MainTable loaderState={loaderState} allEventsData={allEventsData}  />
            </TabPane>
            <TabPane tab="CALENDAR" key="2">
                <CalendarView allEventsData={allEventsData} />
            </TabPane>
            <TabPane tab="LIST" key="3">
                Content of Tab Pane 3
            </TabPane>
        </Tabs>
    )
}

export default TabView;
