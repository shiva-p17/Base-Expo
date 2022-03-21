import { userService } from '../services';
import { loadState, store } from './index';
import { isAuthenticated } from './user/user-select';
import { Subscription } from 'rxjs';
import userActions from './user/user-slice';

let userSubscription: Subscription;

export async function initialize() {
  await loadState();
  const { users } = store.getState();
  if (!isAuthenticated(users)) {
    return;
  }
  try {
    if (userSubscription) {
      userSubscription.unsubscribe();
    }

    userSubscription = userService
      .stream(users.user.objectId)
      .subscribe((currentUser) => {
        return store.dispatch(
          userActions.updateUserData({
            currentUser,
          }),
        );
      });
  } catch (e) {
    console.log('something went wrong with initialization');
    console.log(e);
  }
  return users.user;
}
