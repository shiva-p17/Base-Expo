import { ACL, ParseFile } from './common';

export type User = {
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  ACL: ACL;
  objectId: string;
  name: string;
  sessionToken?: string;
  profilePicture?: ParseFile;
};
