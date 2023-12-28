const CURRENT_USER = 'current-user';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export function getUser() {
  const token = localStorage.getItem(CURRENT_USER);
  if (!token) {
    return null;
  }

  return parseJwt(token);
}

export function getUserToken() {
  return localStorage.getItem(CURRENT_USER);
}

export function setUser(token) {
  localStorage.setItem(CURRENT_USER, token);
}

export function clearUser() {
  localStorage.removeItem(CURRENT_USER);
}