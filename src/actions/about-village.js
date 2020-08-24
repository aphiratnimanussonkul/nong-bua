import firebase from "../firebase/index";
import { createActionSet } from "../helpers/index";

const { firestore } = firebase;

export const FETCH_ABOUT_VILLAGE = createActionSet("FETCH_ABOUT_VILLAGE");

export const getAboutVillage = () => async (dispatch) => {
  dispatch({ type: FETCH_ABOUT_VILLAGE.PENDDING });
  try {
    await firestore
      .collection("about-village")
      .orderBy("sorting", "asc")
      .get()
      .then((result) => {
        dispatch({
          type: FETCH_ABOUT_VILLAGE.SUCCESS,
          payload: result.docs.map((data) => {
            return {
              id: data.id,
              ...data.data(),
            };
          }),
        });
      });
  } catch (error) {
    dispatch({ type: FETCH_ABOUT_VILLAGE.FAILED });
  }
};

export const getAllAboutVillage = () => async (dispatch) => {
  dispatch({ type: FETCH_ABOUT_VILLAGE.PENDDING });
  try {
    await firestore
      .collection("about-village")
      .get()
      .then((result) => {
        dispatch({
          type: FETCH_ABOUT_VILLAGE.SUCCESS,
          payload: result.docs.map((data) => {
            return {
              id: data.id,
              ...data.data(),
            };
          }),
        });
      });
  } catch (error) {
    dispatch({ type: FETCH_ABOUT_VILLAGE.FAILED });
  }
};

export const updateAboutVillageById = async (aboutVillage) => {
  const { id, ...others } = aboutVillage;
  return await firestore.collection("about-village").doc(id).set(others);
};

export const deleteAboutVillageById = async (id) => {
  return await firestore.collection("about-village").doc(id).delete();
};

export const createAboutVillage = async (aboutVillage) => {
  return await firestore.collection("about-village").add(aboutVillage);
};
