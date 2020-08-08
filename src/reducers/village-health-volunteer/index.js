import {
  FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS,
  FETCH_VILLAGE_HEALTH_VOLUNTEER_DIRECTORT,
} from "../../actions/village-health-volunteer";

export const initState = {
  news: [],
  error: null,
  directories: [],
};

export default (state = initState, { type, payload, error }) => {
  switch (type) {
    case (FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS.PENDDING,
    FETCH_VILLAGE_HEALTH_VOLUNTEER_DIRECTORT.PENDDING):
      return state;
    case FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS.SUCCESS:
      return { ...state, news: payload };
    case FETCH_VILLAGE_HEALTH_VOLUNTEER_DIRECTORT.SUCCESS:
      return { ...state, directories: payload };
    case (FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS.FAILED,
    FETCH_VILLAGE_HEALTH_VOLUNTEER_DIRECTORT.FAILED):
      return { ...state, error };
    default:
      return state;
  }
};
