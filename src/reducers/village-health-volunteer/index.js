import { FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS } from "../../actions/village-health-volunteer";

export const initState = {
  news: [],
  error: null,
};

export default (state = initState, { type, payload, error }) => {
  switch (type) {
    case FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS.PENDDING:
      return state;
    case FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS.SUCCESS:
      return { ...state, news: payload };
    case FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS.FAILED:
      return { ...state, error };
    default:
      return state;
  }
};
