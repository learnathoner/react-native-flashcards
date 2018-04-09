import { combineReducers } from 'redux';

import { RECEIVE_DECKS, ADD_DECK } from '../actions';

const decks = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS: {
      const { byId, allDecks } = action.decks;
      return {
        ...state,
        byId,
        allDecks
      };
    }
    case ADD_DECK: {
      const { deck } = action;
      console.log('adding deck');

      return {
        ...state,
        byId: {
          ...state.byId,
          [deck.id]: deck
        },
        allDecks: state.allDecks.add(deck.id)
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  decks
});

export default rootReducer;
