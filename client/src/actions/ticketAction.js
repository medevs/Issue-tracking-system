import axios from "axios";
import {
  LOAD_TICKETS,
  LOAD_USER_TICKETS,
  POST_TICKET,
  UPDATE_TICKET,
  CLEAR_TICKETS,
  POST_ERROR,
  POST_SUCCESS,
  CURRENT_TICKET,
  POST_COMMENT,
  IS_NEW_COMMENT,
  COMMENT_ERROR,
  POST_IMAGE,
  IMAGE_ERROR,
  IS_LOADING,
  POST_SINGLE_IMAGE,
  CLEAR_SINGLE_IMAGE,
  UPDATE_PROFILE_IMAGE_ERROR,
  DELETE_NEW_TIX_IMAGE,
} from "../actions/actions";
import { tokenConfig, returnErrors } from "./authAction";

export const loadAllTickets = () => (dispatch) => {
  axios.get("/api/tickets").then((data) => {
    dispatch({
      type: LOAD_TICKETS,
      payload: data.data,
    });
  });
};

export const loadUserTickets = () => (dispatch, getState) => {
  axios.get("/api/users/user", tokenConfig(getState)).then((data) => {
    dispatch({
      type: LOAD_USER_TICKETS,
      payload: data.data.tickets,
    });
  });
};

export const addComment = (id, data) => (dispatch) => {
  // console.log("id", id);
  // console.log("data", data);

  axios
    .put("/api/ticket/comment/" + id, data)
    .then((data) => {
      dispatch({
        type: POST_COMMENT,
        payload: data.data,
      });
    })
    .catch((err) => {
      // console.log(err.response.data);
      dispatch(
        returnErrors(err.response.data, err.response.status, COMMENT_ERROR)
      );
    });
};

export const isNewComment =
  (id, newUserComment, newAdminComment) => (dispatch) => {
    let dataObj;
    if (newUserComment === null) {
      dataObj = { newAdminComment };
    }
    if (newAdminComment === null) {
      dataObj = { newUserComment };
    }

    axios
      .put("/api/ticket/comment/new/" + id, dataObj)
      .then((data) => {
        // console.log("ACTION AFTER", data.data);
        dispatch({
          type: IS_NEW_COMMENT,
          payload: data.data,
        });
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, COMMENT_ERROR)
        );
      });
  };

export const changeTixStatus = (id, data) => (dispatch) => {
  axios
    .put("/api/ticket/update/" + id, data)
    .then((data) => {
      dispatch({
        type: UPDATE_TICKET,
        payload: data.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, COMMENT_ERROR)
      );
    });
};

export const clearTickets = () => {
  return {
    type: CLEAR_TICKETS,
  };
};

export const currentTicket = (id) => {
  return {
    type: CURRENT_TICKET,
    payload: id,
  };
};

export const addImage = (data, config) => (dispatch) => {
  axios
    .post("/api/ticket/image/upload", data, config)
    .then((data) => {
      console.log(data.data);

      dispatch({
        type: POST_IMAGE,
        payload: data.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, IMAGE_ERROR)
      );
    });
};

export const addImageNewTix = (data, config) => (dispatch) => {
  axios
    .post("/api/tickets/newimage/upload", data, config)
    .then((data) => {
      console.log(data.data);

      dispatch({
        type: POST_SINGLE_IMAGE,
        payload: data.data.file.filename,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, IMAGE_ERROR)
      );
    });
};

export const isLoadingImage = (status) => {
  return {
    type: IS_LOADING,
    payload: status,
  };
};

export const clearCurrentImages = () => {
  return {
    type: CLEAR_SINGLE_IMAGE,
  };
};

export const imageDeleteNewTix = (filename) => (dispatch) => {
  axios
    .delete("/api/ticket/newimage/" + filename)
    .then((data) => {
      dispatch({
        type: DELETE_NEW_TIX_IMAGE,
        payload: filename,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          UPDATE_PROFILE_IMAGE_ERROR
        )
      );
    });
};

export const addTicket = (data) => (dispatch) => {
  axios
    .post("/api/tickets", data)
    .then((data) => {
      dispatch({
        type: POST_TICKET,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, POST_ERROR)
      );
    });
};

export const postSuccess = () => {
  return {
    type: POST_SUCCESS,
  };
};
