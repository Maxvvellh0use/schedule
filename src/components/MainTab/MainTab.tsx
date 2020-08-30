import React from "react";
import { Tabs } from 'antd';
import { useSelector } from "react-redux";

import './MainTab.scss'

import CalendarView from "../CalendarView/CalendarView";
import TableView from "../TableView/TableView";
import ListView from "../ListView/ListView";

interface RootState {
    app: {
        errorText: string,
    },
}


const MainTab: React.FC = () => {
    const { TabPane } = Tabs;
    const errorText = useSelector<RootState, string>(state => state.app.errorText);
    return (
        <section className='main_tab_section'>
            <Tabs type="card">
                <TabPane tab="TABLE" key="1">
                    <TableView />
                </TabPane>
                <TabPane tab="CALENDAR" key="2">
                    {
                        errorText ? <div>{errorText}</div> :
                    <CalendarView />
                    }
                </TabPane>
                <TabPane tab="LIST" key="3">
                    {
                        errorText ? <div>{errorText}</div> :
                        <ListView/>
                    }
                </TabPane>
            </Tabs>
       </section>
    )
}

export default MainTab;
