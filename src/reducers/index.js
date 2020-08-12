import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as form } from "redux-form";

import villageFund from "./village-fund/index";
import home from "./home/index";
import aboutVillage from "./about-village/index";
import villageHealthVolunteer from "./village-health-volunteer/index";
import readNews from "./read-news/index";
import userRole from './user-role/index'

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    form,
    villageFund,
    home,
    aboutVillage,
    villageHealthVolunteer,
    readNews,
    userRole,
  });
