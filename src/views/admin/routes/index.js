import React from "react";
import { Switch, Route } from "react-router-dom";
import NewsManage from "../components/news-manage/news-manage";
import VillageFundDirectory from "../components/village-fund-directory/village-fund-directory";
import VillageFundPorject from "../components/village-fund-project/village-fund-project";
import VillageHealthVolunteerDirectory from "../components/village-health-volunteer-directory/village-health-volunteer-directory";
import AboutVillage from "../components/about-village/about-village";
import StaticData from "../components/static-data/static-data";

const ManagementRoutes = () => {
  return (
    <Switch>
      <Route exact path="/management" component={NewsManage} />
      <Route exact path="/management/news-manage" component={NewsManage} />
      <Route
        exact
        path="/management/village-fund-directory"
        component={VillageFundDirectory}
      />
      <Route
        exact
        path="/management/village-fund-project"
        component={VillageFundPorject}
      />
      <Route
        exact
        path="/management/village-health-volunteer"
        component={VillageHealthVolunteerDirectory}
      />
      <Route exact path="/management/about-village" component={AboutVillage} />
      <Route exact path="/management/static-data" component={StaticData} />
    </Switch>
  );
};

export default ManagementRoutes;
