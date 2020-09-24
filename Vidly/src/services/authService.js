import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token"; 

//Login - calls API endpoint, recieves JWT from server w/ valid user/password, stores JWT in localStorage (persistance)
export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt); //local storage -> store key-value pairs -> arg1 = key, arg2= value
}

//Register - server sends JWT after register, store JWT in localStorage (logged in)
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt); //local storage -> store key-value pairs -> arg1 = key, arg2= value
}

//logout - removes JWT from local Storage 
export function logout() {
  localStorage.removeItem(tokenKey); //removes jwt from local storage (logout)
}

//
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  loginWithJwt,
  getCurrentUser,
};
