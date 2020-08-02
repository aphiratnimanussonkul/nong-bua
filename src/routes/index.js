import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../views/home/home.js";
import NewsInformation from "../views/news-information/news-information.js";
import VillageFund from "../views/village-fund/village-fund.js";

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/news-information" component={NewsInformation} />
      <Route exact path="/village-fund" component={VillageFund} />
    </Switch>
  );
};

export default Routing;
