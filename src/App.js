import React from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Routes from "./routes/index";
import { withRouter } from "react-router-dom";

import "./theme/global.scss";
import "./App.css";

const App = () => {
  return (
    <>
      <Header></Header>
      <div className="container">
        <Routes></Routes>
      </div>
      <Footer></Footer>
    </>
  );
};

export default withRouter(App);
