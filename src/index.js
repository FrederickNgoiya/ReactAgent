import "bootstrap/dist/css/bootstrap.css";
import "./styles/style.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {Router} from "react-router-dom";
import reduxThunk from "redux-thunk";

import history from "./utils/historyUtils";
import App from './components/App';
import reducers from "./reducers";
import { AUTH_USER } from "./actions/types";
import registerServiceWorker from './registerServiceWorker';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem("token");

if (token) {
    store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
    , document.getElementById("root"));
registerServiceWorker();
