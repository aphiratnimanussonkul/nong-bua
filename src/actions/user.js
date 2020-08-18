import firebaseApp from "../firebase/index";
import { createActionSet } from "../helpers/index";

const { auth } = firebaseApp;

export const SIGNIN_USER = createActionSet("SIGNIN_USER");

export const loginWithEmailAndPassword = ({ email, password }) => async (
  dispatch
) => {
  dispatch({ type: SIGNIN_USER.PENDDING });
  try {
    auth.signInWithEmailAndPassword(email, password).then((result) => {
      dispatch({ type: SIGNIN_USER.SUCCESS, payload: result.user });
    });
  } catch (error) {
    dispatch({ type: SIGNIN_USER.FAILED });
  }
};
