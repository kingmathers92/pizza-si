import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  users: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
    updateUserCart: (state, action) => {
      const { userId, cartItems } = action.payload;
      state.users[userId] = cartItems;
    },
  },
});

export const {
  signIn,
  signOut: performingSignOut,
  updateUserCart,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const selectUserCart = (state, userId) =>
  state.user?.users[userId] || [];

export default userSlice.reducer;
