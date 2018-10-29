import * as actionTypes from '../constants/action-types';
import {kutsuApiUrl} from '../constants/config';
import fetchGetJSON from '../util/fetchGetJson';
import fetchPostJson from '../util/fetchPostJson';
import fetchDeleteJson from '../util/fetchDeleteJson';

export const getKutsuApiCoursesAction = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GET_COURSES_REQUEST,
    });
    fetchGetJSON(`${kutsuApiUrl}/courses`).then((courses) => {
      dispatch({
        type: actionTypes.GET_COURSES_SUCCESS,
        courses,
      });
    }).catch(() => {
      dispatch({
        type: actionTypes.GET_COURSES_ERROR,
      });
    });
  };
};

export const getKutsuApiQueueAction = (cID, kID, kType) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GET_QUEUE_REQUEST,
    });
    fetchGetJSON(`${kutsuApiUrl}/queue/${cID}/${kID}/${kType}`)
        .then((total) => {
          dispatch({
            type: actionTypes.GET_QUEUE_SUCCESS,
            total,
          });
        })
        .catch(() => {
          dispatch({
            type: actionTypes.GET_QUEUE_ERROR,
          });
        });
  };
};

export const postKutsuApiCallAction = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.POST_CALL_REQUEST,
    });
    fetchPostJson(`${kutsuApiUrl}/call`, data).then((call) => {
      console.log(JSON.parse(call).kID);
      if (call) {
        call = JSON.parse(call);
        dispatch({
          type: actionTypes.POST_CALL_SUCCESS,
          call,
        });
      } else {
        dispatch({
          type: actionTypes.POST_CALL_ERROR,
        });
      }
    }).catch(() => {
      dispatch({
        type: actionTypes.POST_CALL_ERROR,
      });
    });
  };
};

export const deleteKutsuApiCallAction = (id) => {
  console.log(`${kutsuApiUrl}/call/${id}`);

  return (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_CALL_REQUEST,
    });
    fetchDeleteJson(`${kutsuApiUrl}/call/${id}`).then((call) => {
      if (call) {
        dispatch({
          type: actionTypes.DELETE_CALL_SUCCESS,
          call,
        });
      } else {
        dispatch({
          type: actionTypes.DELETE_CALL_ERROR,
        });
      }
    }).catch(() => {
      dispatch({
        type: actionTypes.DELETE_CALL_ERROR,
      });
    });
  };
};