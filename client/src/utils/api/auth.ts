import client from './client';

const URI = '/api/auth';

export type SignUp = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type SignIn = {
  username: string;
  password: string;
};

export type UserType = {
  username: string;
  email: string;
};

export const signUp = (userInfo: SignUp) =>
  client.post(`${URI}/signup`, userInfo);

export const signIn = (userInfo: SignIn) =>
  client.post(`${URI}/signin`, userInfo);

export const signOut = () => client.post(`${URI}/signout`);

export const check = () => client.get(`${URI}/check`);
