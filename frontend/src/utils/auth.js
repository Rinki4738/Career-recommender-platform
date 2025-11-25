// src/utils/auth.js

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const clearToken = () => {
  localStorage.removeItem("token");
};

// auth.js
export const logout = () => {
  clearToken(); // removes the token from localStorage
};

