import axios from 'axios';

export const CHANGE_AUTH = 'CHANGE_AUTH';
export const CREATE_USER = 'CREATE_USER';
export const LOG_OUT = 'LOG_OUT';
export const ON_UNMOUNT = 'ON_UNMOUNT';

export const CREATE_DRAFT = 'CREATE_DRAFT';

// User actions
export function authenticate(username, password) {
  const request = axios.post('/api/login', {
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
  const request = axios.post('/api/signup', {
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

// Draft actions
export function createDraft(name, userId) {
  axios.post('/api/create-draft', {
    name,
    userId,
  }).then((response) => {
    return response;
  }).catch((error) => {
    throw error;
  });

  const request = axios.get(`/api/drafts/${userId}`, {
    userId,
  }).then((response) => {
    return response;
  }).catch((error) => {
    throw error;
  });

  return {
    type: CREATE_DRAFT,
    payload: request,
  }
}