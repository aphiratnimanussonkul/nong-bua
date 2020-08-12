import React from "react";
import { Switch, Route } from "react-router-dom";
import NewsManage from "../components/news-manage/news-manage";

const ManagementRoutes = () => {
  return (
    <Switch>
      <Route exact path="/management" component={NewsManage} />
      <Route exact path="/management/news-manage" component={NewsManage} />
    </Switch>
  );
};

export default ManagementRoutes;
