import firebase from "../firebase/index";
import { createActionSet } from "../helpers/index";

const { firestore } = firebase;

export const FETCH_NEWS_INFORMATION = createActionSet("FETCH_NEWS_INFORMATION");
export const FETCH_VILLAGE_INTRODUCE = createActionSet(
  "FETCH_VILLAGE_INTRODUCE"
);

export const getNews = () => async (dispatch) => {
  dispatch({ type: FETCH_NEWS_INFORMATION.PENDDING });

  try {
    await firestore
      .collection("news-information")
      .orderBy("createdAt", "desc")
      .get()
      .then((result) => {
        dispatch({
          type: FETCH_NEWS_INFORMATION.SUCCESS,
          payload: result.docs.map((data) => {
            return {
              id: data.id,
              ...data.data(),
            };
          }),
        });
      });
  } catch (error) {
    dispatch({ type: FETCH_NEWS_INFORMATION.FAILED, error });
  }
};

export const getVillageIntroduce = () => async (dispatch) => {
  dispatch({ type: FETCH_VILLAGE_INTRODUCE.PENDDING });

  try {
    await firestore
      .collection("about-village")
      .where("tag", "==", "INTRODUCE")
      .get()
      .then((result) => {
        dispatch({
          type: FETCH_VILLAGE_INTRODUCE.SUCCESS,
          payload: result.docs.map((data) => data.data()),
        });
      });
  } catch (error) {
    dispatch({ type: FETCH_VILLAGE_INTRODUCE.FAILED, error });
  }
};
