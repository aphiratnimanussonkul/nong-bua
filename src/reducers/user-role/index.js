import { SIGNIN_USER, FETCH_USER_INFO } from "../../actions/user";

export const initState = {
  isAdmin: false,
  loginFail: false,
  userInfo: null,
  error: null,
};

export default (state = initState, { type, payload, error }) => {
  switch (type) {
    case (SIGNIN_USER.PENDDING, FETCH_USER_INFO.PENDDING):
      return state;
    case (SIGNIN_USER.SUCCESS, FETCH_USER_INFO.SUCCESS):
      return {
        isAdmin: true,
        loginFail: false,
        userInfo: payload,
      };

    case FETCH_USER_INFO.FAILED:
      return initState;
    case SIGNIN_USER.FAILED:
      return {
        isAdmin: false,
        loginFail: true,
        userInfo: null,
        error,
      };
    default:
      return state;
  }
};
