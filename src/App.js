import React from "react";
import { withRouter } from "react-router-dom";

import "./theme/global.scss";
import "./App.css";
import AppViewer from "./views/app-viewer/app-viewer";
import Admin from "./views/admin/admin";
import { connect } from "react-redux";

const App = ({ isAdmin }) => {
  return <>{isAdmin ? <Admin></Admin> : <AppViewer></AppViewer>}</>;
};

const mapStateToPros = (state) => ({
  isAdmin: state.userRole.isAdmin,
});
export default withRouter(connect(mapStateToPros)(App));
