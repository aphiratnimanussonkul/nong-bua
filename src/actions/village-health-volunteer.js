import firebase from "../firebase/index";
import { createActionSet } from "../helpers/index";

const { firestore } = firebase;

export const FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS = createActionSet(
  "FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS"
);
export const FETCH_VILLAGE_HEALTH_VOLUNTEER_DIRECTORT = createActionSet(
  "FETCH_VILLAGE_HEALTH_VOLUNTEER_DIRECTORT"
);
export const FETCH_VILLAGE_STATIC = createActionSet("FETCH_VILLAGE_STATIC");

export const getVillageHealthVolunteerNews = () => async (dispatch) => {
  dispatch({ type: FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS.PENDDING });

  try {
    await firestore
      .collection("news-information")
      .where("tags", "array-contains", "อสม")
      .get()
      .then((result) => {
        dispatch({
          type: FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS.SUCCESS,
          payload: result.docs
            .map((data) => data.data())
            .sort(
              (prev, cur) => cur.createdAt.seconds - prev.createdAt.seconds
            ),
        });
      });
  } catch (error) {
    dispatch({ type: FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS.FAILED });
  }
};

export const getVillageHealthVolunteerDirectory = () => async (dispatch) => {
  dispatch({ type: FETCH_VILLAGE_HEALTH_VOLUNTEER_DIRECTORT.PENDDING });

  try {
    await firestore
      .collection("village-health-volunteer-directory")
      .orderBy("priority", "asc")
      .get()
      .then((result) => {
        dispatch({
          type: FETCH_VILLAGE_HEALTH_VOLUNTEER_DIRECTORT.SUCCESS,
          payload: result.docs.map((data) => data.data()),
        });
      });
  } catch (error) {
    dispatch({ type: FETCH_VILLAGE_HEALTH_VOLUNTEER_DIRECTORT.FAILED });
  }
};

export const getVillageStatic = () => async (dispatch) => {
  dispatch({ type: FETCH_VILLAGE_STATIC.PENDDING });

  try {
    await firestore
      .collection("village-static")
      .get()
      .then((result) => {
        dispatch({
          type: FETCH_VILLAGE_STATIC.SUCCESS,
          payload: result.docs.map((data) => data.data()),
        });
      });
  } catch (error) {
    dispatch({ type: FETCH_VILLAGE_STATIC.FAILED });
  }
};
