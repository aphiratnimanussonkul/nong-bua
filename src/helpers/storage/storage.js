export const setUserUID = (token) => {
  sessionStorage.setItem("user_uid", token);
};

export const getUserUID = () => {
  return sessionStorage.getItem("user_uid");
};
