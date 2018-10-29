import * as actionTypes from '../constants/action-types';

const initialState = {
  courses: [
    {
      cID: '1',
      cName: 'Kurssi 1',
    }],
  call: {
    kID: 0,
    kName: '',
    kType: -1,
    kcID: 0,
    success: false,
  },
  isLoading: false,
  queue:-10,
};

export default (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.GET_COURSES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.courses,
        isLoading: false,
      };
    case actionTypes.GET_COURSES_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.GET_QUEUE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_QUEUE_SUCCESS:
      return {
        ...state,
        queue: action.total.total,
        isLoading: false,
      };
    case actionTypes.GET_QUEUE_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.POST_CALL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.POST_CALL_SUCCESS:
      return {
        ...state,
        call: {
          ...state.call,
          kID: action.call.kID,
          success: true,
        },
        isLoading: false,
      };
    case actionTypes.POST_CALL_ERROR:
      return {
        ...state,
        call: {
          ...state.call,
          success: false,
        },
        isLoading: false,
      };
    case actionTypes.SET_USER_DATA:
      return {
        ...state,
        call: {
          ...state.call,
          kName: action.user.kName,
          kType: action.user.kType,
          kcID: action.user.kcID,
        },
        isLoading: false,
      };
    default:
      return state;
  }
}
