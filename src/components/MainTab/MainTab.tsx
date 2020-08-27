import React from "react";
import { Tabs } from 'antd';
import CalendarView from "../CalendarView/CalendarView";


import './MainTab.scss'
import TableView from "../TableView/TableView";

const MainTab: React.FC = () => {
    const { TabPane } = Tabs;
    return (
        <section className='main_tab_section'>
            <Tabs type="card">
                <TabPane tab="TABLE" key="1">
                    <TableView />
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
