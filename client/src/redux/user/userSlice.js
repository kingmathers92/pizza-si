import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null, // Ensure the initial state structure includes currentUser
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.currentUser = action.payload; // Ensure to update currentUser in the reducer
    },
    signOut: (state) => {
      state.currentUser = null; // Clear currentUser on sign-out
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export const selectUser = (state) => state.user.currentUser; // Correct the selector to point to currentUser

export default userSlice.reducer;
