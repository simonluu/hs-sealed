import axios from 'axios';

export const CHANGE_AUTH = 'CHANGE_AUTH';
export const CREATE_USER = 'CREATE_USER';
export const LOG_OUT = 'LOG_OUT';
export const ON_UNMOUNT = 'ON_UNMOUNT';

export function authenticate(username, password) {
  const request = axios.post('/login', {
    username,
    password,
  }).then((response) => {
    return response;
  }).catch((error) => {
    throw error;
  });

  return {
    type: CHANGE_AUTH,
    payload: request,
  }
}

export function createUser(username, password) {
  const request = axios.post('/signup', {
    username,
    password,
  }).then((response) => {
    return response;
  }).catch((error) => {
    throw error;
  });

  return {
    type: CREATE_USER,
    payload: request,
  }
}

export function logOut() {
  return {
    type: LOG_OUT,
    payload: { auth: false, error: null },
  }
}

export function onUnmount() {
  return {
    type: ON_UNMOUNT,
    payload: { auth: false, error: null },
  }
}