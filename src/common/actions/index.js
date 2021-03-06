import axios from 'axios';

const config = {
  headers: { 'X-Mashape-Key': 'i4BEtXsQLXmshazvYZg0HYAGEEoWp1weej2jsnSvQVWvOhknjd'}
};

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
export const SUBTRACT_COUNTER = 'SUBTRACT_COUNTER';
export const ADD_COUNTER = 'ADD_COUNTER';
export const UPDATE_COUNTER = 'UPDATE_COUNTER';
export const FETCH_CARDS = 'FETCH_CARDS';
export const RESET_CARDS = 'RESET_CARDS';
export const ADD_REVEALED = 'ADD_REVEALED';
export const RESET_REVEALED = 'RESET_REVEALED';

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

// This is for Signup/Login unmounts
export function onUnmount() {
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

export function subtractCounter(type) {
  return {
    type: SUBTRACT_COUNTER,
    payload: type,
  }
}

export function addCounter(type) {
  return {
    type: ADD_COUNTER,
    payload: type,
  }
}

export function updateAmountAndCards(type, cards, userId, draftId) {
  const request = axios.patch(`/api/drafts/${userId}/${draftId}`, {
    expansion: type,
    cards: cards,
  }).then((response) => {
    return response;
  }).catch((error) => {
    throw error;
  });

  return {
    type: UPDATE_COUNTER,
    payload: request,
  }
}

export function addRevealedCards(card) {
  return {
    type: ADD_REVEALED,
    payload: card,
  }
}

export function resetRevealedCards() {
  return {
    type: RESET_REVEALED,
  }
}

export function retrieveCards(state, expansion) {
  const encodedExpansion = encodeURIComponent(expansion);
  const request = axios.get(`https://omgvamp-hearthstone-v1.p.mashape.com/cards/sets/${encodedExpansion}?collectible=1`, config)
  .then((response) => {
    return response;
  }).catch((error) => {
    throw error;
  });
  
  return {
    type: FETCH_CARDS,
    payload: request,
    state: state,
  };
}

export function resetCardState() {
  return {
    type: RESET_CARDS,
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
    id: draftId,
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