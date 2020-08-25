import firebaseApp from "../firebase/index";
import { createActionSet } from "../helpers/index";
const { auth } = firebaseApp;
export const SIGNIN_USER = createActionSet("SIGNIN_USER");
export const FETCH_USER_INFO = createActionSet("FETCH_USER_INFO");

export const loginWithEmailAndPassword = ({ email, password }) => async (
  dispatch
) => {
  dispatch({ type: SIGNIN_USER.PENDDING });
  try {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        dispatch({ type: SIGNIN_USER.SUCCESS, payload: result.user });
      })
      .catch(() => {
        dispatch({ type: SIGNIN_USER.FAILED });
      });
  } catch (error) {
    dispatch({ type: SIGNIN_USER.FAILED });
  }
};

export const getUserInfo = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_INFO.PENDDING });
  try {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: FETCH_USER_INFO.SUCCESS, payload: user });
      } else {
        dispatch({ type: FETCH_USER_INFO.FAILED });
      }
    });
  } catch {
    dispatch({ type: FETCH_USER_INFO.FAILED });
  }
};

export const logout = () => {
  try {
    auth.signOut();
  } catch {}
};
