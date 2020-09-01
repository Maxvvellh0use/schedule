import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPageLayout from './components/MainPageLayout/MainPageLayout';
import { MainPage } from './pages/MainPage';
import { TaskCreatorPage } from './pages/TaskCreatorPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={MainPage} path="/" exact/>
        <Route component={TaskCreatorPage} path="/task-creator"/>
      </Switch>      
    </BrowserRouter>
  );
}

export default App;
