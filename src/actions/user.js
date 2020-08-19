import firebaseApp from "../firebase/index";
import { createActionSet } from "../helpers/index";
import { getUserUID, setUserUID } from "../helpers/storage/storage";
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
        dispatch({ type: SIGNIN_USER.SUCCESS, payload: result.user.uid });
        setUserUID(result.user.uid);
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
    const userUID = getUserUID();
    if (userUID) {
      dispatch({ type: FETCH_USER_INFO.SUCCESS, payload: userUID });
    } else {
      dispatch({ type: FETCH_USER_INFO.FAILED });
    }
  } catch {
    dispatch({ type: FETCH_USER_INFO.FAILED });
  }
};

export const logout = () => {
  try {
    auth.signOut().then(() => {
      setUserUID(null);
    });
  } catch {}
};
