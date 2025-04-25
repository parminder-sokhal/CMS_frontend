import axios from "axios";
import {
  chatRequest,
  chatFail,
  createChatSuccess,
  replyChatSuccess,
  changeChatActivitySuccess,
} from "../reducers/chatSlice.js";

const server = import.meta.env.VITE_BACKEND_URL;

export const createChat = (id, payload) => async (dispatch) => {
  try {
    dispatch(chatRequest());

    const { data } = await axios.post(`${server}/chat/create/${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    dispatch(createChatSuccess(data));
  } catch (error) {
    dispatch(chatFail(error.response?.data?.message || "Failed to create chat"));
  }
};


export const replyToChat = (id, reply) => async (dispatch) => {
  try {
    dispatch(chatRequest());

    const { data } = await axios.put(`${server}/chat/reply/${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    dispatch(replyChatSuccess(data));
  } catch (error) {
    dispatch(chatFail(error.response?.data?.message || "Failed to send reply"));
  }
};

export const changeChatActivity = (id, activityStatus) => async (dispatch) => {
  try {
    dispatch(chatRequest());

    const { data } = await axios.put(`${server}/chat/activity/${id}`, { activityStatus });
    dispatch(changeChatActivitySuccess(data));
  } catch (error) {
    dispatch(chatFail(error.response?.data?.message || "Failed to change chat activity"));
  }
};
