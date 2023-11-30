import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  cart: [],
  checkoutStatus: null,
  paymentDetails: null,
  laoding: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
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
      state.cart = [];
    },
    startCheckout: (state) => {
      state.checkoutStatus = "processing";
    },
    completeCheckout: (state, action) => {
      state.checkoutStatus = "completed";
      state.paymentDetails = action.payload;
    },
    cancelCheckout: (state) => {
      state.checkoutStatus = "canceled";
    },
  },
});

export const {
  startLoading,
  stopLoading,
  signIn,
  signOut: performingSignOut,
  updateUserCart,
  addItem,
  removeItem,
  cleanCart,
  startCheckout,
  completeCheckout,
  cancelCheckout,
} = userSlice.actions;

export const selectLoadingState = (state) => state.user.loading;

export const selectUser = (state) => state.user.user;
export const selectUserCart = (state) => state.user.cart;

export const selectCheckoutStatus = (state) => state.user?.checkoutStatus;
export const selectPaymentDetails = (state) => state.user?.paymentDetails;

export default userSlice.reducer;
