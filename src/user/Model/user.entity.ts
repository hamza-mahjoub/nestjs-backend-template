/* eslint-disable @typescript-eslint/ban-types */
import * as mongoose from 'mongoose';
import { ROLE, STATUS } from '../../utils/constants';

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String, minlength: 3, maxlength: 100, required: true },
    firstName: { type: String, minlength: 3, maxlength: 100, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      maxlength: 255,
      minlength: 6,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    username: { type: String, required: true },
    role: {
      type: String,
      default: ROLE.user,
    },

    fullAddress: {
      city: { type: String, default: '' },
      country: { type: String, default: '' },
      postalCode: { type: String, default: '' },
      address: { type: String, default: '' },
    },
    phoneNumber: { type: String, required: true },
    status: {
      type: String,
      default: STATUS.deactivated,
    },
  },
  { timestamps: true },
);

export class User extends mongoose.Document {
  name: string;
  firstName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  fullAddress: Object;
  phoneNumber: string;
  status: string;
}
