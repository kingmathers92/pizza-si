import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cart.push(action.payload);
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    cleanCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addItem, removeItem, cleanCart } = cartSlice.actions;

export default cartSlice.reducer;
