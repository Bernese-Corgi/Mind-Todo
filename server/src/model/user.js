import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

/* --------------------------------- schema --------------------------------- */
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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

/**
 * 해시된 비밀번호 필드(hashedPassword)가 응답되지 않도록 데이터를 JSON으로 변환 후 해당 필드 삭제
 * @returns hashedPassword 필드를 삭제한 데이터
 */
UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

// TODO 토큰 생성 메서드
// TODO 비밀번호 일치 확인 메서드

/* ----------------------------- static methods ----------------------------- */
/**
 * 주어진 username이 데이터베이스에 존재하는지 찾는다.
 * @param username 데이터베이스에 일치하는 document가 있는지 찾을 username
 * @returns 주어진 인수와 일치하는 document가 데이터베이스에 하나 이상 있으면 해당 document를, 없으면 null을 반환
 */
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

/**
 * 주어진 email이 데이터베이스에 존재하는지 찾는다.
 * @param email 데이터베이스에 일치하는 document가 있는지 찾을 email
 * @returns 주어진 인수와 일치하는 document가 데이터베이스에 하나 이상 있으면 해당 document를, 없으면 null을 반환
 */
UserSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

/* ------------------------------ create model ------------------------------ */
const User = mongoose.model('User', UserSchema);

export default User;
