import { FETCH_ABOUT_VILLAGE } from "../../actions/about-village";

export const initState = {
  aboutVillage: [],
  error: null,
  isLoading: true,
};

export default (state = initState, { type, payload, error }) => {
  switch (type) {
    case FETCH_ABOUT_VILLAGE.PENDDING:
      return state;
    case FETCH_ABOUT_VILLAGE.SUCCESS:
      return {
        ...state,
        aboutVillage: payload,
        isLoading: false,
      };

    case FETCH_ABOUT_VILLAGE.FAILED:
      return {
        ...state,
        error,
        isLoading: false,
      };
    default:
      return state;
  }
};
