import firebase from "../firebase/index";
import { createActionSet } from "../helpers/index";

const { firestore } = firebase;

export const FETCH_NEWS_INFORMATION = createActionSet("FETCH_NEWS_INFORMATION");

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
          payload: result.docs.map((data) => data.data()),
        });
      });
  } catch (error) {
    dispatch({ type: FETCH_NEWS_INFORMATION.FAILED, error });
  }
};
