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

/* ---------------------------- instance methods ---------------------------- */
/**
 * 비밀번호를 인수로 받아 schema instance의 hashedPassword 값으로 설정
 * @param {*} password 해싱할 비밀번호
 */
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};
