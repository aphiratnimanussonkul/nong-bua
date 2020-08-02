import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../views/home/home.js";
import NewsInformation from "../components/news-information/news-information.js";

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/news-information" component={NewsInformation} />
    </Switch>
  );
};

export default Routing;
