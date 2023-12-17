import httpService from './httpService';
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'token';

refreshTokenHeader();

export function refreshTokenHeader() {
  httpService.setCommonHeader('x-auth-token', getJWT());
}

export function createUser(user) {
  return httpService.post('/users', user);
}

export async function login(credentials) {
  const response = await httpService.post('/users/login', credentials);
  localStorage.setItem(TOKEN_KEY, response.data);
  refreshTokenHeader();

  return response;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  refreshTokenHeader();
}

export function getAllUsers() {
  return httpService.get(`/users`);
}

export function updateUser(_id, user) {
  return httpService.put(`/users/${_id}`, user);
}

export function updateBusiness(_id) {
  return httpService.patch(`/users/${_id}`);
}

export function deleteUser(_id) {
  return httpService.delete(`/users/${_id}`);
}

export function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

//revers token for showing the user on all the app's pages
export function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function getUserById(_id) {
  return httpService.get(`/users/${_id}`);
}

const usersService = {
  createUser,
  login,
  logout,
  getUserById,
  getAllUsers,
  updateUser,
  updateBusiness,
  deleteUser,
  getJWT,
  getUser,
};
export default usersService;
