import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: {},
  },
  reducers: {
    addItem: (state, action) => {
      const { userId, itemId, name, price, image, size, quantity } =
        action.payload;
      const calculatedPrice = price * quantity;

      const newItem = {
        itemId,
        name,
        price: calculatedPrice,
        image,
        size,
        quantity,
      };

      if (!state.carts[userId]) {
        state.carts[userId] = [];
      }
      state.carts[userId].push(newItem);
    },
    removeItem: (state, action) => {
      const { userId, itemId } = action.payload;
      state.carts[userId] = state.carts.filter((item) => item.id !== itemId);
    },
    cleanCart: (state, action) => {
      const { userId } = action.payload;
      state.carts[userId] = [];
    },
  },
});

export const { addItem, removeItem, cleanCart } = cartSlice.actions;

export const selectCart = (state, userId) => state.cart.carts[userId] || [];

export default cartSlice.reducer;
