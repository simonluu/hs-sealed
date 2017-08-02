import { combineReducers } from 'redux';

import {
  CHANGE_AUTH,
  CREATE_USER,
  LOG_OUT,
  ON_UNMOUNT,
  CREATE_DRAFT,
} from '../actions';

function AuthReducer(state = { auth: false, error: null }, action) {
  switch(action.type) {
    case CHANGE_AUTH:
      if (action.payload.data.error) {
        return Object.assign({}, { userId: null, auth: false, error: action.payload.data.error });
      } else {
        sessionStorage.setItem('authenticated', true);
        return Object.assign({}, { userId: action.payload.data.id, auth: true, error: null });
      }
    case CREATE_USER:
      if (action.payload.data.error) {
        return Object.assign({}, { userId: null, auth: false, error: action.payload.data.error });
      } else {
        sessionStorage.setItem('authenticated', true);
        return Object.assign({}, { userId: action.payload.data.id, auth: true, error: null });
      }
    case LOG_OUT:
      sessionStorage.removeItem('authenticated');
      return Object.assign({}, state, action.payload);
    case ON_UNMOUNT:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

function UserReducer(state = {}, action) {
  switch(action.type) {
    case CREATE_DRAFT:
      console.log(action.payload)
      return Object.assign({}, { drafts: action.payload.data });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  authenticated: AuthReducer,
  user_info: UserReducer,
});

export default rootReducer;