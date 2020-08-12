import React from "react";
import { withRouter } from "react-router-dom";

import "./theme/global.scss";
import "./App.css";
import AppViewer from "./views/app-viewer/app-viewer";

const App = () => {
  return <AppViewer></AppViewer>;
};

export default withRouter(App);
