import { combineReducers } from 'redux';

import {
  CHANGE_AUTH,
  CREATE_USER,
  LOG_OUT,
  ON_UNMOUNT,
  DRAFT_STATE,
  RETRIEVE_DRAFTS,
  CREATE_DRAFT,
  DELETE_DRAFT,
} from '../actions';

function AuthReducer(state = { auth: false, error: null }, action) {
  switch(action.type) {
    case CHANGE_AUTH:
      if (action.payload.data.error) {
        return Object.assign({}, { auth: false, error: action.payload.data.error });
      } else {
        sessionStorage.setItem('authenticated', true);
        return Object.assign({}, { auth: true, error: null });
      }
    case CREATE_USER:
      if (action.payload.data.error) {
        return Object.assign({}, { auth: false, error: action.payload.data.error });
      } else {
        sessionStorage.setItem('authenticated', true);
        return Object.assign({}, { auth: true, error: null });
      }
    case LOG_OUT:
      sessionStorage.removeItem('authenticated');
      return Object.assign({}, state, { auth: false, error: null });
    case ON_UNMOUNT:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

function UserReducer(state = { userId: null, drafts: null }, action) {
  switch(action.type) {
    case CHANGE_AUTH:
    case CREATE_USER:
      if (!action.payload.data.error) {
        return Object.assign({}, state, { userId: action.payload.data.id });
      }
      return null;
    case RETRIEVE_DRAFTS:
      return Object.assign({}, state, { drafts: action.payload.data });
    case CREATE_DRAFT:
      return Object.assign({}, state, { drafts: [ ...state.drafts, action.payload.data ] });
    case DELETE_DRAFT:
      return Object.assign({}, state, { drafts: action.payload.data });
    case LOG_OUT:
      return Object.assign({}, state, { userId: null, drafts: null });
    default:
      return state;
  }
}

function applicationReducer(state = { draftState: null }, action) {
  switch(action.type) {
    case DRAFT_STATE:
      return Object.assign({}, { draftState: action.payload });
    case LOG_OUT:
      return Object.assign({}, { draftState: null });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  authenticated: AuthReducer,
  userInfo: UserReducer,
  app: applicationReducer,
});

export default rootReducer;