import { UserTypes as UserState } from './user-types';

export const isAuthenticated = ({ user }: UserState) => user && !!user.objectId;
