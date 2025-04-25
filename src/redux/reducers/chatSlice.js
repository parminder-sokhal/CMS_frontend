import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  chats: [],
  error: null,
  message: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    chatRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    createChatSuccess(state, action) {
      state.loading = false;
      state.chats.push(action.payload.data);
      state.message = action.payload.message;
    },
    replyChatSuccess(state, action) {
      state.loading = false;
      const updatedChat = action.payload.data;
      state.chats = state.chats.map(chat =>
        chat.id === updatedChat.id ? updatedChat : chat
      );
      state.message = action.payload.message;
    },
    changeChatActivitySuccess(state, action) {
      state.loading = false;
      const updatedChat = action.payload.data;
      state.chats = state.chats.map(chat =>
        chat.id === updatedChat.id ? updatedChat : chat
      );
      state.message = action.payload.message;
    },
    chatFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  chatRequest,
  createChatSuccess,
  replyChatSuccess,
  changeChatActivitySuccess,
  chatFail,
} = chatSlice.actions;

export default chatSlice.reducer;
