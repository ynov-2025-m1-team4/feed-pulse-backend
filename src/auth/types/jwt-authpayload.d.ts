import { Types } from 'mysql2';

export type AuthJwtPayload = {
  id: Types.ObjectId;
  email: string;
  password: string;
  pseudo: string;
};
