import firebase from "../firebase/index";
import { createActionSet } from "../helpers/index";

const { firestore } = firebase;

export const FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS = createActionSet(
  "FETCH_VILLAGE_HEALTH_VOLUNTEER_NEWS"
);

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
