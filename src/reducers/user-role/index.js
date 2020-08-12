// import {
//     FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS,
//     FETCH_VILLAGE_HEALTH_VOLUNTEER_DIRECTORT,
//     FETCH_VILLAGE_STATIC,
//   } from "../../actions/village-health-volunteer";

export const initState = {
  isAdmin: true,
};

export default (state = initState, { type, payload, error }) => {
  return state;
  // switch (type) {
  //   case (FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS.PENDDING,
  //   FETCH_VILLAGE_HEALTH_VOLUNTEER_DIRECTORT.PENDDING,
  //   FETCH_VILLAGE_STATIC.PENDDING):
  //     return state;
  //   case FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS.SUCCESS:
  //     return { ...state, news: payload };
  //   case FETCH_VILLAGE_HEALTH_VOLUNTEER_DIRECTORT.SUCCESS:
  //     return { ...state, directories: payload };
  //   case FETCH_VILLAGE_STATIC.SUCCESS:
  //     return { ...state, villageStatics: payload };
  //   case (FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS.FAILED,
  //   FETCH_VILLAGE_HEALTH_VOLUNTEER_DIRECTORT.FAILED,
  //   FETCH_VILLAGE_STATIC.FAILED):
  //     return { ...state, error };
  //   default:
  //     return state;
  // }
};
