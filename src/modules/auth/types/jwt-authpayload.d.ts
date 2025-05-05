import { Types } from 'mongoose';

export type AuthJwtPayload = {
  id: Types.ObjectId;
  email: string;
  password: string;
  pseudo: string;
};
