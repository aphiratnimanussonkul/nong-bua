import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as form } from "redux-form";

import villageFund from "./village-fund/index";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    form,
    villageFund,
  });
