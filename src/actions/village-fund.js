import firebase from "../firebase/index";
import { createActionSet } from "../helpers/index";

const { firestore } = firebase;

export const FETCH_VIILAGE_FUND_DIRECTORY = createActionSet(
  "FETCH_VIILAGE_FUND_DIRECTORY"
);

export const getVillageFundDireactory = () => async (dispatch) => {
  dispatch({ type: FETCH_VIILAGE_FUND_DIRECTORY.PENDDING });

  try {
    await firestore
      .collection("village-fund-directory")
      .get()
      .then((result) => {
        dispatch({
          type: FETCH_VIILAGE_FUND_DIRECTORY.SUCCESS,
          payload: result.docs.map((data) => data.data()),
        });
      });
  } catch (error) {
    dispatch({
      type: FETCH_VIILAGE_FUND_DIRECTORY.FAILED,
      error,
    });
  }
};
