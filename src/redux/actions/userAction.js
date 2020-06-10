import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const response = await axios.post("/login", userData);
    setAuthorizationHeader(response.data.token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push("/");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const signupUser = (userData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const response = await axios.post("/signup", userData);
    setAuthorizationHeader(response.data.token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push("/");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    const response = await axios.get("/user");
    dispatch({
      type: SET_USER,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const uploadUserImage = (formData) => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    await axios.post("/user/image", formData);
    dispatch(getUserData());
  } catch (error) {
    console.log(error);
  }
};

export const editUserDetails = (userDetails) => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    await axios.post("/user", userDetails);
    dispatch(getUserData());
  } catch (err) {
    console.log(err);
  }
};

export const markNotificationsRead = (notificationsIds) => async (dispatch) => {
  try {
    const response = await axios.post("/notifications", notificationsIds);
    dispatch({ type: MARK_NOTIFICATIONS_READ });
  } catch (error) {
    console.log(error);
  }
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
