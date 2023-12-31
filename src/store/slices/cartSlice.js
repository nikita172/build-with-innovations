import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalQuantity: 0,
    cart: []
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find(item => item.id == newItem.itemId);
      if (existingItem) {
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
        existingItem.quantity = newItem.quantity;
        state.totalQuantity = state.totalQuantity + existingItem.quantity;
      } else {
        state.cart.push({
          id: newItem.itemId,
          quantity: newItem.quantity,
          title: newItem.title,
          thumbnail: newItem.thumbnail,
          description: newItem.description,
          price: newItem.price
        })
        state.totalQuantity = state.totalQuantity + newItem.quantity;
      }

    },
    removeFromCart: (state, action) => {
      const newId = action.payload;
      const findItem = state.cart.find(i => i.id == newId)
      state.cart = state.cart.filter(item => item.id !== newId)
      state.totalQuantity = state.totalQuantity - findItem.quantity;
    },
    resetCart: (state, action) => {
      state.cart = [];
      state.totalQuantity = 0;
    }
  }
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;