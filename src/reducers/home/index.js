import {
  FETCH_NEWS_INFORMATION,
  FETCH_VILLAGE_INTRODUCE,
} from "../../actions/home";

export const initState = {
  news: [],
  villageIntroduce: null,
  error: null,
};

export default (state = initState, { type, payload, error }) => {
  switch (type) {
    case (FETCH_NEWS_INFORMATION.PENDDING, FETCH_VILLAGE_INTRODUCE.PENDDING):
      return state;
    case FETCH_NEWS_INFORMATION.SUCCESS:
      return {
        ...state,
        news: payload,
      };
    case FETCH_VILLAGE_INTRODUCE.SUCCESS:
      return {
        ...state,
        villageIntroduce: payload[0],
      };
    case (FETCH_NEWS_INFORMATION.FAILED, FETCH_VILLAGE_INTRODUCE.FAILED):
      return {
        ...state,
        error,
      };
    default:
      return state;
  }
};
