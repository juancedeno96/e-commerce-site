import React from "react";
import { Switch, Route } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import Cart from "./Pages/Cart";
import CheckoutPage from "./Pages/CheckoutPage";
import HomePage from "./Pages/HomePage";

export default (
<Switch>
  <Route exact path="/" component={AuthPage} />
  <Route path="/checkout" component={CheckoutPage} />
  <Route path="/home" component={HomePage} />
  <Route path="/cart" component={Cart} />

</Switch>
);
