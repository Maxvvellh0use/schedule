import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPageLayout from './components/MainPageLayout/MainPageLayout';
import { MainPage } from './pages/MainPage';
import { TaskCreatorPage } from './pages/TaskCreatorPage';

import './style/index.scss'
import TaskPage from './components/TaskPage/TaskPage';

function App() {
  return (
    <>
     <BrowserRouter>
      <Switch>
        <Route component={MainPage} path="/" exact/>
          <Route
            key="task-creator"
            component={TaskCreatorPage}
            path="/task-creator" />
          <Route
            key="task-editor"
            component={TaskCreatorPage}
            path="/task-editor/:id" />
        <Route component={TaskPage} path="/task/:id" />
       </Switch>      
     </BrowserRouter>      
    </>
  );
}

export default App;
