import { FETCH_NEWS_BY_ID } from "../../actions/read-news";

export const initState = {
  news: null,
  error: null,
  newsRelate: [],
};

export default (state = initState, { type, payload, error }) => {
  switch (type) {
    case FETCH_NEWS_BY_ID.PENDDING:
      return state;
    case FETCH_NEWS_BY_ID.SUCCESS:
      return {
        ...state,
        news: payload.news,
        newsRelate: payload.newsRelate,
      };
    case FETCH_NEWS_BY_ID.FAILED:
      return {
        ...state,
        error,
      };
    default:
      return state;
  }
};
