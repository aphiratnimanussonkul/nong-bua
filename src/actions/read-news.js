import firebase from "firebase/app";
import firebaseApp from "../firebase/index";
import { createActionSet } from "../helpers/index";

const { firestore } = firebaseApp;

export const FETCH_NEWS_BY_ID = createActionSet("FETCH_NEWS_BY_ID");
export const FETCH_NEWS_RELATE = createActionSet("FETCH_NEWS_RELATE");

export const getNewsById = (newsId) => async (dispatch) => {
  dispatch({ type: FETCH_NEWS_BY_ID.PENDDING });
  try {
    await firestore
      .collection("news-information")
      .doc(newsId)
      .get()
      .then(async (result) => {
        const newsRelate = await getNewsRelate(result.data().tags);
        dispatch({
          type: FETCH_NEWS_BY_ID.SUCCESS,
          payload: {
            news: { id: result.id, ...result.data() },
            newsRelate: newsRelate.docs
              .filter((doc) => doc.id !== newsId)
              .map((data) => {
                return {
                  id: data.id,
                  ...data.data(),
                };
              }),
          },
        });
      });
  } catch (error) {
    dispatch({ type: FETCH_NEWS_BY_ID.FAILED, error });
  }
};

const getNewsRelate = async (tags) => {
  return await firestore
    .collection("news-information")
    .where("tags", "array-contains-any", tags)
    .get();
};

export const createNews = async (news) => {
  return await firestore.collection("news-information").add({
    ...news,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const deleteNewsById = async (newsId) => {
  return await firestore.collection("news-information").doc(newsId).delete();
};

export const updateNewsById = async (news) => {
  const { id, ...others } = news;
  return await firestore.collection("news-information").doc(id).update(others);
};
