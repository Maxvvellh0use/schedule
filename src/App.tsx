import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPageLayout from './components/MainPageLayout/MainPageLayout';
import { MainPage } from './pages/MainPage';
import { TaskCreatorPage } from './pages/TaskCreatorPage';

import './style/index.scss'
import TaskPage from './components/TaskPage/TaskPage';
import {useSelector} from "react-redux";
import {RootStateType} from "./components/types";

function App() {
    const theme = useSelector<RootStateType>(state => state.app.theme);
   theme === 'dark' ? require('antd/dist/antd.dark.css') : require('antd/dist/antd.css');
  return (
    <>
     <BrowserRouter>
      <Switch>
        <Route component={MainPage} path="/" exact/>
        <Route component={TaskCreatorPage} path="/task-creator" />
        <Route component={TaskPage} path="/task/:id" />
       </Switch>
     </BrowserRouter>
    </>
  );
}

export default App;
