import { BASE_API_URL } from './appConfig';

export const BASE_AUTH = 'auth';
export const LOGIN = `${BASE_AUTH}/signIn`;
export const LOGOUT = `${BASE_AUTH}/signOut`;
export const SIGNUP = `${BASE_AUTH}/signUp`;
export const GET_ACCESS_TOKEN = `${BASE_AUTH}/refresh`;
export const GET_CURRENT_USER = `${BASE_AUTH}/me`;
export const COMMON_SELECT_SEARCH = `${BASE_API_URL}/{type}/searchLite`;
