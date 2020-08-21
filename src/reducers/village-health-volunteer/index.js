import {
  FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS,
  FETCH_VILLAGE_HEALTH_VOLUNTEER_DIRECTORY,
  FETCH_VILLAGE_STATIC,
} from "../../actions/village-health-volunteer";

export const initState = {
  news: [],
  error: null,
  directories: [],
  villageStatics: [],
  isLoading: true,
};

export default (state = initState, { type, payload, error }) => {
  switch (type) {
    case (FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS.PENDDING,
    FETCH_VILLAGE_HEALTH_VOLUNTEER_DIRECTORY.PENDDING,
    FETCH_VILLAGE_STATIC.PENDDING):
      return state;
    case FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS.SUCCESS:
      return { ...state, news: payload, isLoading: false };
    case FETCH_VILLAGE_HEALTH_VOLUNTEER_DIRECTORY.SUCCESS:
      return { ...state, directories: payload, isLoading: false };
    case FETCH_VILLAGE_STATIC.SUCCESS:
      return { ...state, villageStatics: payload, isLoading: false };
    case (FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS.FAILED,
    FETCH_VILLAGE_HEALTH_VOLUNTEER_DIRECTORY.FAILED,
    FETCH_VILLAGE_STATIC.FAILED):
      return { ...state, error, isLoading: false };
    default:
      return state;
  }
};
