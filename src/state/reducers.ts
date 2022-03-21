import { CombinedState, combineReducers } from 'redux';
import { AppState } from './types';
import { userReducer } from './user/user-slice';
import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initial-state';

const combinedReducer = combineReducers<AppState>({
  users: userReducer,
});

export const resetStore = createAction('reset');

export const rootReducer = (
  state: CombinedState<AppState> | undefined,
  action: PayloadAction,
) => {
  if (resetStore.match(action)) {
    return combinedReducer(initialState, action);
  }
  return combinedReducer(state, action);
};
