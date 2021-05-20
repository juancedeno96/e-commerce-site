import React from "react";
import { Switch, Route } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import CheckoutPage from "./Pages/CheckoutPage";

export default (
<Switch>
  <Route exact path="/" component={AuthPage} />
  <Route path="/checkout" component={CheckoutPage} />
</Switch>
);
