import React from "react";
import { Tabs } from 'antd';
import { useSelector } from "react-redux";
import { connect } from 'react-redux';

import './MainTab.scss'

import CalendarView from "../CalendarView/CalendarView";
import TableView from "../TableView/TableView";
import ListView from "../ListView/ListView";
import {SystemState} from "../../redux/types";
import {EventData} from "../types";

interface RootState {
    app: {
        errorText: string,
    },
}

interface Props {
    allEventsData: EventData[],
}


const MainTab: React.FC<Props> = ({ allEventsData }) => {
    const { TabPane } = Tabs;
    const errorText = useSelector<RootState, string>(state => state.app.errorText);
    const isEventsDataReceived = () => Boolean(!allEventsData.length);
    return (
        <section className='main_tab_section'>
            <Tabs type="card">
                <TabPane tab="TABLE" key="1">
                    <TableView />
                </TabPane>
                <TabPane disabled={isEventsDataReceived()} tab="CALENDAR" key="2">
                    {
                        errorText ? <div>{errorText}</div> :
                    <CalendarView />
                    }
                </TabPane>
                <TabPane disabled={isEventsDataReceived()} tab="LIST" key="3">
                    {
                        errorText ? <div>{errorText}</div> :
                        <ListView/>
                    }
                </TabPane>
            </Tabs>
       </section>
    )
}

const mapStateToProps = (state: SystemState) => ({
    allEventsData: state.allEventsData,
})

export default connect(mapStateToProps)(MainTab);
