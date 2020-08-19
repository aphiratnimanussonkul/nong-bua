import React, { useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Login from "../views/login/login";
import { connect } from "react-redux";
import AppViewer from "../views/app-viewer/app-viewer";
import Admin from "../views/admin/admin";
import { getUserInfo } from "../actions/user";
const AppRoute = ({ dispatch, isAdmin }) => {
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  return (
    <Switch>
      <Route exact path="/management/login" component={Login} />
      <Route path="/management" component={isAdmin ? Admin : Login} />
      <Route path="/" component={AppViewer} />
    </Switch>
  );
};
const mapStateToPros = (state) => ({
  isAdmin: state.userRole.isAdmin,
});
export default withRouter(connect(mapStateToPros)(AppRoute));
