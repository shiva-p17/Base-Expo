import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './user-initial-state';
import reducers from './user-reducer';
import { AppState } from '../types';

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers,
});

export const userReducer = userSlice.reducer;

export const userSelect = (state: AppState) => state.users;

export default userSlice.actions;
