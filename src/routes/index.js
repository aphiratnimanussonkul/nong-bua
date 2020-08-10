import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../views/home/home.js";
import NewsInformation from "../views/news-information/news-information.js";
import VillageFund from "../views/village-fund/village-fund.js";
import VillageHealthVolunteer from "../views/village-health-volunteer/village-health-volunteer.js";
import AboutVillage from "../views/about-village/about-village.js";
import ReadNews from "../views/read-news/read-news.js";

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/news-information" component={NewsInformation} />
      <Route exact path="/village-fund" component={VillageFund} />
      <Route
        exact
        path="/village-health-volunteer"
        component={VillageHealthVolunteer}
      />
      <Route exact path="/about-village" component={AboutVillage} />
      <Route exact path="/news-information/:id" component={ReadNews} />
    </Switch>
  );
};

export default Routing;
