import { configureStore, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './rootReducer';
import { ThunkAction } from 'redux-thunk';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false
  })
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
