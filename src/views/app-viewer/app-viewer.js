import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Routes from "./routes/index";

import "./app-viewer.scss";

const AppViewer = () => {
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

export default AppViewer;
