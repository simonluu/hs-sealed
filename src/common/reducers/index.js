import { combineReducers } from 'redux';

import {
  CHANGE_AUTH,
  CREATE_USER,
  LOG_OUT,
  ON_UNMOUNT,
  DRAFT_STATE,
  TAB_STATE,
  SET_EXP,
  SUBTRACT_COUNTER,
  ADD_COUNTER,
  UPDATE_COUNTER,
  FETCH_CARDS,
  RESET_CARDS,
  ADD_REVEALED,
  RESET_REVEALED,
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

function UserReducer(state = { userId: null, draftId: null, drafts: [] }, action) {
  switch(action.type) {
    case CHANGE_AUTH:
    case CREATE_USER:
      if (!action.payload.data.error) {
        return Object.assign({}, state, { userId: action.payload.data.id, draftId: null, drafts: [] });
      }
      return null;
    case RETRIEVE_DRAFTS:
      return Object.assign({}, state, { drafts: action.payload.data });
    case RETRIEVE_DRAFT:
      return Object.assign({}, state, { draftId: action.id });
    case CREATE_DRAFT:
      return Object.assign({}, state, { draftId: action.payload.data.id, drafts: [ ...state.drafts, action.payload.data ] });
    case DELETE_DRAFT:
      return Object.assign({}, state, { draftId: null, drafts: action.payload.data });
    case LOG_OUT:
      return Object.assign({}, state, { userId: null, draftId: null, drafts: [] });
    default:
      return state;
  }
}

function applicationReducer(state = { draftState: null, tabState: false, formatState: null, expState: null, packsState: [], cardState: [], revealed: 0, packList: [] }, action) {
  switch(action.type) {
    case CREATE_DRAFT:
    case RETRIEVE_DRAFT:
      const data = action.payload.data;
      return Object.assign({}, state, { draftState: data.state, tabState: true, formatState: data.format, packsState: data.packs, cardState: [], revealed: 0, packList: data.cards });
    case DELETE_DRAFT:
      return Object.assign({}, state, { draftState: null, tabState: false, formatState: null, packsState: [], cardState: [], revealed: 0, packList: [] });
    case DRAFT_STATE:
      return Object.assign({}, state, { draftState: action.payload });
    case TAB_STATE:
      return Object.assign({}, state, { tabState: action.payload });
    case SET_EXP:
      return Object.assign({}, state, { expState: action.payload });
    case SUBTRACT_COUNTER:
      return Object.assign({}, state, { packsState: state.packsState.map((data) => data.type === action.payload ? { ...data, amount: data.amount - 1 } : data) });
    case ADD_COUNTER:
      return Object.assign({}, state, { packsState: state.packsState.map((data) => data.type === action.payload ? { ...data, amount: data.amount + 1 } : data) });
    case UPDATE_COUNTER:
      return Object.assign({}, state, { packsState: action.payload.data.packs, packList: action.payload.data.cards });
    case FETCH_CARDS:
      const cards = fetchCardsHelper(action.payload.data);
      return Object.assign({}, state, { cardState: cards });
    case RESET_CARDS:
      return Object.assign({}, state, { cardState: [] });
    case ADD_REVEALED:
      return Object.assign({}, state, { revealed: state.revealed + 1, packList: [ ...state.packList, action.payload ] });
    case RESET_REVEALED:
      return Object.assign({}, state, { revealed: 0 });
    case LOG_OUT:
      return Object.assign({}, state, { draftState: null, tabState: false, formatState: null, expState: null, packsState: [], cardState: [], revealed: 0, packList: [] });
    default:
      return state;
  }
}

// FETCH_CARDS helper function
function fetchCardsHelper(data) {
  let fiveCards = [];
  // for basic cards
  if (data[0].cardSet === "Basic") {
    // find 5 random basic cards
    while (fiveCards.length < 5) {
      const index = Math.floor(Math.random() * 133);
      const chanceOfGolden = Math.random();

      let card = {
        name: data[index].name,
        type: "regular",
        rarity: "Common",
        img: "",
      }

      if (data[index].type !== "Hero") {
        if (chanceOfGolden > .99) {
          card.type = "golden";
          card.img = data[index].imgGold;
        } else {
          card.img = data[index].img;
        }
        fiveCards.push(card);
      }
    }
  } else {
    // for non basic cards, group into common/rare/epic/legendary
    const common = [];
    const rare = [];
    const epic = [];
    const legendary = [];
    data.map((card) => {
      if (card.rarity === "Common") {
        common.push(card);
      } else if (card.rarity === "Rare") {
        rare.push(card);
      } else if (card.rarity === "Epic") {
        epic.push(card);
      } else if (card.rarity === "Legendary") {
        legendary.push(card);
      }
      return null;
    });

    let commonCount = 0;

    while (fiveCards.length < 5) {
      let rarity = 0;
      let index;

      let card = {
        name: "",
        type: "regular",
        rarity: "Common",
        img: "",
      }

      if (commonCount !== 4) {
        rarity = Math.random();
      } else {
        while (rarity <= .6929 || (rarity <= .9822 && rarity > .9658)) {
          rarity = Math.random();
        }
      }

      if (rarity <= .6929) {
        // adds common card
        index = Math.floor(Math.random() * common.length);
        card.name = common[index].name;
        card.img = common[index].img;
        commonCount++;
      } else if (rarity <= .9107 && rarity > .6929) {
        // adds rare card
        index = Math.floor(Math.random() * rare.length);
        card.name = common[index].name;
        card.rarity = rare[index].rarity;
        card.img = rare[index].img;
      } else if (rarity <= .9556 && rarity > .9107) {
        // adds epic card
        index = Math.floor(Math.random() * epic.length);
        card.name = epic[index].name;
        card.rarity = epic[index].rarity;
        card.img = epic[index].img;
      } else if (rarity <= .9658 && rarity > .9556) {
        // adds legendary card
        index = Math.floor(Math.random() * legendary.length);
        card.name = legendary[index].name;
        card.rarity = legendary[index].rarity;
        card.img = legendary[index].img;
      } else if (rarity <= .9822 && rarity > .9658) {
        // adds golden common card
        index = Math.floor(Math.random() * common.length);
        card.name = common[index].name;
        card.type = "golden";
        card.img = common[index].imgGold;
        commonCount++;
      } else if (rarity <= .9969 && rarity > .9822) {
        // adds golden rare card
        index = Math.floor(Math.random() * rare.length);
        card.name = rare[index].name;
        card.type = "golden";
        card.rarity = rare[index].rarity;
        card.img = rare[index].imgGold;
      } else if (rarity <= .9991 && rarity > .9969) {
        // adds golden epic card
        index = Math.floor(Math.random() * epic.length);
        card.name = epic[index].name;
        card.type = "golden";
        card.rarity = epic[index].rarity;
        card.img = epic[index].imgGold;
      } else if (rarity <= 1 && rarity > .9991) {
        // adds golden lgendary card
        index = Math.floor(Math.random() * legendary.length);
        card.name = legendary[index].name;
        card.type = "golden";
        card.rarity = legendary[index].rarity;
        card.img = legendary[index].imgGold;
      }
      fiveCards.push(card);
    }
  }
  return fiveCards;
}

const rootReducer = combineReducers({
  authenticated: AuthReducer,
  userInfo: UserReducer,
  app: applicationReducer,
});

export default rootReducer;