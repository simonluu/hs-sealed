import { combineReducers } from 'redux';

import {
  CHANGE_AUTH,
  CREATE_USER,
  LOG_OUT,
  ON_UNMOUNT,
  DRAFT_STATE,
  TAB_STATE,
  RETRIEVE_DRAFTS,
  RETRIEVE_DRAFT,
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

function UserReducer(state = { userId: null, drafts: [] }, action) {
  switch(action.type) {
    case CHANGE_AUTH:
    case CREATE_USER:
      if (!action.payload.data.error) {
        return Object.assign({}, state, { userId: action.payload.data.id, drafts: [] });
      }
      return null;
    case RETRIEVE_DRAFTS:
      return Object.assign({}, state, { drafts: action.payload.data });
    case CREATE_DRAFT:
      return Object.assign({}, state, { drafts: [ ...state.drafts, action.payload.data ] });
    case DELETE_DRAFT:
      return Object.assign({}, state, { drafts: action.payload.data });
    case LOG_OUT:
      return Object.assign({}, state, { userId: null, drafts: [] });
    default:
      return state;
  }
}

function applicationReducer(state = { draftState: null, tabState: false, formatState: null, packsState: [] }, action) {
  switch(action.type) {
    case CREATE_DRAFT:
    case RETRIEVE_DRAFT:
      const data = action.payload.data;
      return Object.assign({}, state, { draftState: data.state, tabState: true, formatState: data.format, packsState: data.packs });
    case DELETE_DRAFT:
      return Object.assign({}, state, { draftState: null, tabState: false, formatState: null, packsState: [] });
    case DRAFT_STATE:
      return Object.assign({}, state, { draftState: action.payload });
    case TAB_STATE:
      return Object.assign({}, state, { tabState: action.payload });
    case LOG_OUT:
      return Object.assign({}, state, { draftState: null, tabState: false, formatState: null, packsState: [] });
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