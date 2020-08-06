import { FETCH_VIILAGE_FUND_DIRECTORY } from "../../actions/village-fund";

export const initState = {
  directory: [],
  error: null,
};

export default (state = initState, { type, payload, error }) => {
  switch (type) {
    case FETCH_VIILAGE_FUND_DIRECTORY.PENDDING:
      return {
        ...state,
      };
    case FETCH_VIILAGE_FUND_DIRECTORY.SUCCESS:
      return {
        ...state,
        directory: payload,
      };
    case FETCH_VIILAGE_FUND_DIRECTORY.FAILED:
      return {
        ...state,
        error,
      };

    default:
      return state;
  }
};
