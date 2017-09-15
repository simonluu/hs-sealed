import axios from 'axios';

const standard = [
  { type: 'basic', name: 'Basic', expansion: 'pack', amount: 15 },
  { type: 'classic', name: 'Classic', expansion: 'pack', amount: 10 },
  { type: 'wotog', name: 'Whispers of the Old Gods', expansion: 'pack', amount: 12 },
  { type: 'karazhan', name: 'One Night in Karazhan', expansion: 'adventure', amount: 7 },
  { type: 'msg', name: 'Mean Streets of Gadgetzan', expansion: 'pack', amount: 10 },
  { type: 'jug', name: 'Journey to Un\'Goro', expansion: 'pack', amount: 16 },
  { type: 'kft', name: 'Knights of the Frozen Throne', expansion: 'pack', amount: 20 },
];

const wild = [
  { type: 'basic', name: 'Basic', expansion: 'pack', amount: 15 },
  { type: 'classic', name: 'Classic', expansion: 'pack', amount: 10 },
  { type: 'naxx', name: 'Naxxramas', expansion: 'adventure', amount: 4 },
  { type: 'gvg', name: 'Goblins vs. Gnomes', expansion: 'pack', amount: 6 },
  { type: 'brm', name: 'Blackrock Mountain', expansion: 'adventure', amount: 4 },
  { type: 'tgt', name: 'The Grand Tournament', expansion: 'pack', amount: 6 },
  { type: 'loe', name: 'League of Explorers', expansion: 'adventure', amount: 4 },
  { type: 'wotog', name: 'Whispers of the Old Gods', expansion: 'pack', amount: 6 },
  { type: 'karazhan', name: 'One Night in Karazhan', expansion: 'adventure', amount: 4 },
  { type: 'msg', name: 'Mean Streets of Gadgetzan', expansion: 'pack', amount: 6 },
  { type: 'jug', name: 'Journey to Un\'Goro', expansion: 'pack', amount: 8 },
  { type: 'kft', name: 'Knights of the Frozen Throne', expansion: 'pack', amount: 10 },
];

export const CHANGE_AUTH = 'CHANGE_AUTH';
export const CREATE_USER = 'CREATE_USER';
export const LOG_OUT = 'LOG_OUT';
export const ON_UNMOUNT = 'ON_UNMOUNT';

export const DRAFT_STATE = 'DRAFT_STATE';
export const TAB_STATE = 'TAB_STATE';

export const RETRIEVE_DRAFTS = 'RETRIEVE_DRAFTS';
export const RETRIEVE_DRAFT = 'RETRIEVE_DRAFT';
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

export function setTabState(state) {
  return {
    type: TAB_STATE,
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

export function retrieveDraft(userId, draftId) {
  const request = axios.get(`/api/drafts/${userId}/${draftId}`)
  .then((response) => {
    return response;
  }).catch((error) => {
    throw error;
  });

  return {
    type: RETRIEVE_DRAFT,
    payload: request,
  }
}

export function createDraft(name, format, state, cards, userId) {
  let packs;
  if (format === 'Standard') {
    packs = standard;
  } else if (format === 'Wild') {
    packs = wild;
  }
  const request = axios.post('/api/create-draft', {
    name,
    format,
    userId,
    state,
    packs,
    cards,
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