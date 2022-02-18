/* eslint-disable @typescript-eslint/ban-types */
import * as mongoose from 'mongoose';
import { ROLE, STATUS } from '../../utils/constants';

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      maxlength: 255,
      minlength: 6,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 32,
      required: true,
      match: [
        //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Please fill a valid email address',
      ],
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
