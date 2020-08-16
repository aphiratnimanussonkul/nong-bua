import {
  FETCH_NEWS_INFORMATION,
  FETCH_VILLAGE_INTRODUCE,
} from "../../actions/home";

export const initState = {
  news: [],
  villageIntroduce: null,
  error: null,
  isLoading: true,
};

export default (state = initState, { type, payload, error }) => {
  switch (type) {
    case (FETCH_NEWS_INFORMATION.PENDDING, FETCH_VILLAGE_INTRODUCE.PENDDING):
      return { ...state, isLoading: true };
    case FETCH_NEWS_INFORMATION.SUCCESS:
      return {
        ...state,
        news: payload,
        isLoading: false,
      };
    case FETCH_VILLAGE_INTRODUCE.SUCCESS:
      return {
        ...state,
        isLoading: false,
        villageIntroduce: payload[0],
      };
    case (FETCH_NEWS_INFORMATION.FAILED, FETCH_VILLAGE_INTRODUCE.FAILED):
      return {
        ...state,
        isLoading: false,
        error,
      };
    default:
      return state;
  }
};
