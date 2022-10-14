import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import { moviesApi } from './services/apiSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
