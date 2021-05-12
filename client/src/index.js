import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'

import store from "./store/index";
import { addMessage } from "./actions/index";
import { BrowserRouter, Switch, Route } from 'react-router-dom'

window.store = store
window.addMessage = addMessage;

ReactDOM.render(
  //<React.StrictMode>}
    <Provider store = {store}>
      <BrowserRouter>
        <Switch>
          <Route 
            path="/c/:room"
            component={App}
          />
        </Switch>
      </BrowserRouter>
    </Provider>,
  //</React.StrictMode>},
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
