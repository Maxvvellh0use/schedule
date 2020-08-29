import React from "react";
import { Tabs } from 'antd';
import CalendarView from "../CalendarView/CalendarView";
import { useSelector } from "react-redux";

import './MainTab.scss'
import TableView from "../TableView/TableView";

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
                        <div>Content of Tab Pane 3</div>
                    }
                </TabPane>
            </Tabs>
       </section>
    )
}

export default MainTab;
