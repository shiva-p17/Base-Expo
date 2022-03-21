import { User } from '../types/user';

export const loadProfilePhotoUrl = (user: User) => {
  return user && user.profilePicture ? user.profilePicture.url : undefined;
};
