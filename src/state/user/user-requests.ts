import actions from './user-slice';
import { Dispatch } from 'redux';
import { userService } from '../../services';
import { storeState } from '..';
import { resetStore } from '../reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      await userService.login(email, password);
      const user = await userService.getUser();
      if (user) {
        await dispatch(actions.setUser({ user }));
      } else {
        throw 'Error';
      }
    } catch (e) {
      throw new Error(e.message);
    }
  };
export const register =
  (name: string, email: string, password: string) =>
  async (dispatch: Dispatch) => {
    try {
      await userService.register(name, email, password);
      const user = await userService.getUser();
      await dispatch(actions.setUser({ user }));
    } catch (e) {
      throw new Error(e.message);
    }
  };

export const logout = () => async (dispatch: Dispatch) => {
  try {
    await userService.logout();
    await AsyncStorage.removeItem('sessionToken');
    storeState.purge();
    dispatch(resetStore());
  } catch (e) {
    throw new Error(e.message);
  }
};
