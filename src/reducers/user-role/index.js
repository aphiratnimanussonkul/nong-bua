import { SIGNIN_USER } from "../../actions/user";

export const initState = {
  isAdmin: false,
  loginFail: false,
  userInfo: null,
};

export default (state = initState, { type, payload, error }) => {
  switch (type) {
    case SIGNIN_USER.PENDDING:
      return state;
    case SIGNIN_USER.SUCCESS:
      return {
        isAdmin: true,
        loginFail: false,
        userInfo: payload,
      };
    case SIGNIN_USER.FAILED:
      return {
        isAdmin: false,
        loginFail: true,
        userInfo: null,
      };
    default:
      return state;
  }
};
