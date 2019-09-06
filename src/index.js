import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import {
  applyTimeZone,
  calculatePanchanga,
  calculateBirthPanchanga
} from "../src/services/astro";

import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import reducer from "./store/reducer";
// import axios from 'axios';
// In development, use the browser's Redux dev tools extension if installed
const enhancers = [];
const isDevelopment = process.env.NODE_ENV === "development";
if (
  isDevelopment &&
  typeof window !== "undefined" &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(reducer, {}, compose(...enhancers));

debugger;
const key = "panchanga-data"; //TODO: move it to constant file with export
let item = JSON.parse(localStorage.getItem(key));

if (item && item.birthDate && item.timeZone && item.selectedOption) {

  const birthPanchanga = calculateBirthPanchanga(
    new Date(item.birthDate),
    item.timeZone,
    item.selectedOption
  );

  store.dispatch({ type: "SET_BIRTH_DATA", birthData: birthPanchanga });
  //REDUX store
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
