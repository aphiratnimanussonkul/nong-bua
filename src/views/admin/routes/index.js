import React from "react";
import { Switch, Route } from "react-router-dom";
import NewsManage from "../components/news-manage/news-manage";
import VillageFundDirectory from "../components/village-fund-directory/village-fund-directory";

const ManagementRoutes = () => {
  return (
    <Switch>
      <Route exact path="/management" component={NewsManage} />
      <Route exact path="/management/news-manage" component={NewsManage} />
      <Route exact path="/management/village-fund-directory" component={VillageFundDirectory} />
    </Switch>
  );
};

export default ManagementRoutes;
