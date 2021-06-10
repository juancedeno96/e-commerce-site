import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HashRouter, BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux'
import store from './redux/store'
import reportWebVitals from "./reportWebVitals";
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter

//Stripe
const stripePromise = loadStripe('pk_test_51IsBidK0LrulUWXA1zO0t8R70eZ0XYTeTFvirW8GxmXF6u2ID0f7Z5CIBAdiYjkF6sYCkWvinvjDBnAV1G69c1nd001zR2BuSC');

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <Provider store={store}>
      <Router>
        <App />
      </Router>
      </Provider>
    </Elements>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
