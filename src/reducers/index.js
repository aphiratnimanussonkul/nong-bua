import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as form } from "redux-form";

import villageFund from "./village-fund/index";
import home from "./home/index";
import aboutVillage from "./about-village/index";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    form,
    villageFund,
    home,
    aboutVillage,
  });
