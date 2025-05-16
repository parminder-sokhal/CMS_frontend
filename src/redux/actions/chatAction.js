import axios from "axios";
import {
  chatRequest,
  chatFail,
  createChatSuccess,
  replyChatSuccess,
  changeChatActivitySuccess,
} from "../reducers/chatSlice.js";

const server = import.meta.env.VITE_BACKEND_URL;

// Create Chat
export const createChat = (id, payload) => async (dispatch) => {
  try {
    dispatch(chatRequest());
    const token = localStorage.getItem("Bearer");

    const { data } = await axios.post(`${server}/chat/create/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(createChatSuccess(data));
  } catch (error) {
    dispatch(
      chatFail(error.response?.data?.message || "Failed to create chat")
    );
  }
};

// Reply to Chat (POST using chatData.uuId)
export const replyToChat = (uuId, payload) => async (dispatch) => {
  try {
    dispatch(chatRequest());
    const token = localStorage.getItem("Bearer");

    const { data } = await axios.post(`${server}/chat/reply/${uuId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(replyChatSuccess(data));
  } catch (error) {
    dispatch(chatFail(error.response?.data?.message || "Failed to send reply"));
  }
};

// Change Chat Activity
export const changeChatActivity = (id, activityStatus) => async (dispatch) => {
  try {
    dispatch(chatRequest());
    const token = localStorage.getItem("Bearer");

    const { data } = await axios.put(
      `${server}/chat/activity/${id}`,
      { activityStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(changeChatActivitySuccess(data));
  } catch (error) {
    dispatch(
      chatFail(
        error.response?.data?.message || "Failed to change chat activity"
      )
    );
  }
};
