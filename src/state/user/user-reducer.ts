import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit';
import { UserTypes } from './user-types';

const reducers: ValidateSliceCaseReducers<
  UserTypes,
  SliceCaseReducers<UserTypes>
> = {};

reducers.setUser = (state, action) => {
  return { ...state, ...action.payload };
};

reducers.updateUserData = (state, { payload: { currentUser } }) => {
  return {
    ...state,
    ...{
      user: currentUser,
    },
  };
};

export default reducers;
