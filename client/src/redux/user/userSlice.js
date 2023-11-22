import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  cart: [],
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
      state.cart = action.payload.cartItems;
    },
    addItem: (state, action) => {
      state.cart.push(action.payload);
    },
    removeItem: (state, action) => {
      const itemIdToRemove = action.payload;
      state.cart = state.cart.filter((item) => item.itemId !== itemIdToRemove);
    },
    cleanCart: (state) => {
      state.cart = []; // Clear the cart
    },
  },
});

export const {
  signIn,
  signOut: performingSignOut,
  updateUserCart,
  addItem,
  removeItem,
  cleanCart,
} = userSlice.actions;

export const selectUser = (state) => state.user?.user;

export const selectUserCart = (state) => state.user?.cart;

export default userSlice.reducer;
