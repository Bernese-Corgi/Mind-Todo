import client from './client';

const URI = '/api';

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

export const signUp = (userInfo: SignUp) =>
  client.post(`${URI}/auth/signup`, userInfo);

export const signIn = (userInfo: SignIn) =>
  client.post(`${URI}/auth/signin`, userInfo);

export const signOut = () => client.post(`${URI}/auth/signout`);

export const check = () => client.get(`${URI}/auth/check`);
