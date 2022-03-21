import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';
import { Observable } from 'rxjs';

export default class UserService {
  public stream(userId: string) {
    return new Observable<User>((subscriber) => {
      const updateUserData = async (_result: Parse.Object) => {
        const updatedUser = await this.getUser();
        subscriber.next(updatedUser);
      };
      const userRequestObj = Parse.Object.extend('_User');
      const userRequestQuery = new Parse.Query(userRequestObj);
      userRequestQuery.equalTo('objectId', userId);
      userRequestQuery
        .subscribe()
        .then((subscription) => {
          subscription.on('update', updateUserData);
        })
        .catch((e) => console.error(e));
    });
  }

  public async login(email: string, password: string): Promise<User> {
    try {
      const user = (await Parse.User.logIn(email, password, {
        usePost: true,
      })) as unknown as User;
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async register(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    try {
      const user = new Parse.User();
      user.set('name', name);
      user.set('username', email);
      user.set('email', email);
      user.set('password', password);
      const userObject = await user.signUp(null, {});
      const currentUser = await Parse.User.currentAsync();
      const sessionToken = currentUser!.getSessionToken();
      AsyncStorage.setItem('sessionToken', sessionToken);
      return userObject.toJSON();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async getUser(): Promise<User> {
    const user = await Parse.User.currentAsync();
    if (!user) {
      throw new Error('Cannot get current user');
    }
    return user.toJSON();
  }

  public async logout() {
    try {
      const session = ['sessionToken', 'deviceToken'];
      await Parse.User.logOut();
      await AsyncStorage.multiRemove(session);
    } catch (e) {
      console.log(e);
    }
    return true;
  }
}
