import React from "react";
import "./App.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Routes from "./routes/index";
import { withRouter } from "react-router-dom";

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
