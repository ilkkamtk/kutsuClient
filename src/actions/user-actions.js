import * as actionTypes from '../constants/action-types';

const setUser = user => ({
  type: actionTypes.SET_USER_DATA,
  user,
});

export const setUserAction = user => dispatch => {
  dispatch(setUser(user));
};

