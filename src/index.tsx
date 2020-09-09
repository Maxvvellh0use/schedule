import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware , compose , createStore } from "redux";
import { Provider } from 'react-redux';
import { rootReducer } from "./redux/rootReducer";
import thunk from 'redux-thunk';

import App from './App';

import './style/index.scss';

const initialStateStore =  {
    allEventsData: undefined,
    loading: true,
    errorText: '',
    mode: 'student'
}

const composedEnhancers = compose(
    applyMiddleware(
        thunk,
    )
)

const store = createStore(rootReducer, initialStateStore, composedEnhancers)

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

