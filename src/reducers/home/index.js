import { FETCH_NEWS_INFORMATION } from "../../actions/home";

export const initState = {
  news: [],
  error: null,
};

export default (state = initState, { type, payload, error }) => {
  switch (type) {
    case FETCH_NEWS_INFORMATION.PENDDING:
      return {
        ...state,
      };
    case FETCH_NEWS_INFORMATION.SUCCESS:
      return {
        ...state,
        news: payload,
      };
    case FETCH_NEWS_INFORMATION.FAILED:
      return {
        ...state,
        error,
      };
    default:
      return state;
  }
};
