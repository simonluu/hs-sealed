import axios from 'axios';

export const CHANGE_AUTH = 'CHANGE_AUTH';
export const CREATE_USER = 'CREATE_USER';
export const LOG_OUT = 'LOG_OUT';
export const ON_UNMOUNT = 'ON_UNMOUNT';

export const DRAFT_STATE = 'DRAFT_STATE';

export const RETRIEVE_DRAFTS = 'RETRIEVE_DRAFTS';
export const CREATE_DRAFT = 'CREATE_DRAFT';
export const DELETE_DRAFT = 'DELETE_DRAFT';

// User Login/Signup actions
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
    payload: {},
  }
}

export function onUnmount() {
  // This is for Signup/Login unmounts
  return {
    type: ON_UNMOUNT,
    payload: { auth: false, error: null },
  }
}

// Main Application Actions
export function setDraftState(state) {
  return {
    type: DRAFT_STATE,
    payload: state,
  }
}

// Draft actions
export function retrieveDrafts(userId) {
  const request = axios.get(`/api/drafts/${userId}`)
  .then((response) => {
    return response;
  }).catch((error) => {
    throw error;
  });

  return {
    type: RETRIEVE_DRAFTS,
    payload: request,
  }
}
export function createDraft(name, format, userId) {
  const request = axios.post('/api/create-draft', {
    name,
    format,
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

export function deleteDraft(draftId, userId) {
  const request = axios.delete(`/api/drafts/${userId}/${draftId}`)
  .then((response) => {
    return response;
  }).catch((error) => {
    throw error;
  });

  return {
    type: DELETE_DRAFT,
    payload: request,
  }
}