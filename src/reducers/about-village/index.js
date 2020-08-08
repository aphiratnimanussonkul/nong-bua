import { FETCH_ABOUT_VILLAGE } from "../../actions/about-village";

export const initState = {
  aboutVillage: [],
  error: null,
};

export default (state = initState, { type, payload, error }) => {
  switch (type) {
    case FETCH_ABOUT_VILLAGE.PENDDING:
      return state;
    case FETCH_ABOUT_VILLAGE.SUCCESS:
      return {
        ...state,
        aboutVillage: payload,
      };

    case FETCH_ABOUT_VILLAGE.FAILED:
      return {
        ...state,
        error,
      };
    default:
      return state;
  }
};
