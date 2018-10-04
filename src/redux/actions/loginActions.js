//String Constants are a good way to keep your code DRY
//Imagine changing an action everywhere its used. Gross!
//This way we only need to change it one place.
export const LOGIN_ACTIONS = {
  LOGIN: 'LOGIN',
  CLEAR_LOGIN_ERROR: 'CLEAR_LOGIN_ERROR',
  REQUEST_START: 'REQUEST_START',
  LOGIN_REQUEST_DONE: 'LOGIN_REQUEST_DONE',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGIN_FAILED_NO_CODE: 'LOGIN_FAILED_NO_CODE',
  INPUT_ERROR: 'INPUT_ERROR',
  LOGOUT: 'LOGOUT',
};

//These are functions - each returns an action.
//You could call one an action creator.
export const clearError = () => ({
  type: LOGIN_ACTIONS.CLEAR_LOGIN_ERROR,
});


export const triggerLogin = (username, password) => ({
  type: LOGIN_ACTIONS.LOGIN,
  payload: {
    username,
    password,
  },
});

export const triggerLogout = () => ({
  type: LOGIN_ACTIONS.LOGOUT,
});

export function formError() {
  return {
    type: LOGIN_ACTIONS.INPUT_ERROR,
    payload: 'Enter your username and password!',
  };
}
