import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = { items: [] };

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        console.warn(`Cant remove product (id: ${action.payload}) as its not in basket!`);
      }
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectAllBasketItems = (state) => state.basket.items;
export const selectBasketItemsWithId = (id) => (state) =>
  state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = createSelector(selectAllBasketItems, (items) =>
  items.reduce((total, item) => (total += item.price), 0)
);

export default basketSlice.reducer;
