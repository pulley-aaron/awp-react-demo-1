import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Set up Redux
function reducer(state = {query: "",results: []}, action) {
    console.log("before", state, action);
    switch(action.type) {
        case "UPDATE_SEARCH":
            state.query = action.query;
            state.results = action.results;
            break;
        // More cases would be added in a more complex program.
        default:
            // No default case needed currently, but this removes a warning message.
    };
    console.log("after", state);
    return state;
}
const store = createStore(reducer);

// Render App
ReactDOM.render(
    <Provider
        store={store}
    >
    <App />
    </Provider>,
    document.getElementById('root')
);