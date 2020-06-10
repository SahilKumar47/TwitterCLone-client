import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_SCREAM,
  SET_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";
import axios from "axios";

//Get all Screams
export const getScreams = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    const { data } = await axios.get("/screams");
    dispatch({
      type: SET_SCREAMS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: SET_SCREAMS, payload: [] });
  }
};

//get one scream

export const getScream = (screamId) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const { data } = await axios.get(`/scream/${screamId}`);
    dispatch({ type: SET_SCREAM, payload: data });
    dispatch({ type: STOP_LOADING_UI });
  } catch (err) {
    console.log(err);
  }
};

// Post a scream
export const postScream = (newScream) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    console.log(newScream);
    const { data } = await axios.post("/scream", newScream);
    dispatch({ type: POST_SCREAM, payload: data });
    dispatch({ type: CLEAR_ERRORS });
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};

//Like a Screams
export const likeScream = (screamId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/scream/${screamId}/like`);
    dispatch({
      type: LIKE_SCREAM,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
//Unlike a Scream
export const unLikeScream = (screamId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/scream/${screamId}/unlike`);
    dispatch({
      type: UNLIKE_SCREAM,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const submitComment = (screamId, commentData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `/scream/${screamId}/comment`,
      commentData
    );
    dispatch({ type: SUBMIT_COMMENT, payload: data });
    dispatch({ type: CLEAR_ERRORS });
  } catch (err) {
    console.log(err);
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};

//Delete Scream
export const deleteScream = (screamId) => async (dispatch) => {
  try {
    await axios.delete(`/scream/${screamId}`);
    dispatch({ type: DELETE_SCREAM, payload: screamId });
  } catch (err) {
    console.log(err);
  }
};

//User Data
export const getAllUserData = (userHandle) => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    const { data } = await axios.get(`/user/${userHandle}`);
    dispatch({
      type: SET_SCREAMS,
      payload: data.screams,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: SET_SCREAMS, payload: null });
  }
};
