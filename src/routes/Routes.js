import React from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Post from "../pages/Post";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/profile/:name" component={Profile} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
      </Switch>
    </div>
  );
};

export default Routes;
