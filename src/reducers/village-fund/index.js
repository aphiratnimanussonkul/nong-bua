import {
  FETCH_VIILAGE_FUND_DIRECTORY,
  FETCH_VIILAGE_PROJECT,
  FETCH_VIILAGE_NEWS_INFORMATION,
} from "../../actions/village-fund";

export const initState = {
  directories: [],
  projects: [],
  newsInformation: [],
  error: null,
};

export default (state = initState, { type, payload, error }) => {
  switch (type) {
    case (FETCH_VIILAGE_FUND_DIRECTORY.PENDDING,
    FETCH_VIILAGE_PROJECT.PENDDING,
    FETCH_VIILAGE_NEWS_INFORMATION.PENDDING):
      return state;
    case FETCH_VIILAGE_FUND_DIRECTORY.SUCCESS:
      return {
        ...state,
        directories: payload,
      };
    case FETCH_VIILAGE_PROJECT.SUCCESS:
      return {
        ...state,
        projects: payload,
      };
    case FETCH_VIILAGE_NEWS_INFORMATION.SUCCESS:
      return {
        ...state,
        newsInformation: payload,
      };
    case (FETCH_VIILAGE_FUND_DIRECTORY.FAILED,
    FETCH_VIILAGE_PROJECT.FAILED,
    FETCH_VIILAGE_NEWS_INFORMATION.FAILED):
      return {
        ...state,
        error,
      };

    default:
      return state;
  }
};
