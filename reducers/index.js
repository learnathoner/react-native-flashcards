import { combineReducers } from 'redux';

import { RECEIVE_DECKS } from '../actions';

const decks = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      const { byId, allDecks } = action.decks;
      return {
        ...state,
        byId,
        allDecks
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  decks
});

export default rootReducer;
