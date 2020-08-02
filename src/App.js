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
      <Routes></Routes>
      <Footer></Footer>
    </>
  );
};

export default withRouter(App);
