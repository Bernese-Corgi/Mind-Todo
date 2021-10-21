import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

/* --------------------------------- schema --------------------------------- */
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 2,
    maxlength: 255,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});
