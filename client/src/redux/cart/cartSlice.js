import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addItem: (state, action) => {
      const { id, name, price, image, size, quantity } = action.payload;
      const calculatedPrice = price * quantity;

      const newItem = {
        id,
        name,
        price: calculatedPrice,
        image,
        size,
        quantity,
      };

      state.cart = [...state.cart, newItem];
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
