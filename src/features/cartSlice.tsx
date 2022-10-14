import { createSlice } from '@reduxjs/toolkit';

export interface InitialState {
  value: ICart[];
}

export interface ICartState {
  cart: {
    value: ICart[];
  };
}

export interface ICart {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

const initialState: InitialState = {
  value: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
      // add to cart logic
      if (
        state.value.findIndex((val) => val.imdbID === action.payload.id) === -1
      ) {
        state.value = [...state.value, action.payload];
      }
    },
    remove: (state, action) => {
      // remove from cart logic
      state.value = state.value.filter(
        (movie) => movie.imdbID !== action.payload.imdbID
      );
    },
  },
});

export const { add, remove } = cartSlice.actions;

export default cartSlice.reducer;
