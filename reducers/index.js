import { combineReducers } from 'redux';

import { RECEIVE_DECKS, ADD_DECK, RECEIVE_CARDS, ADD_CARD } from '../actions';

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

    case ADD_CARD: {
      const { id, deck_id } = action.card;

      return {
        ...state,
        byId: {
          ...state.byId,
          [deck_id]: {
            ...state.byId[deck_id],
            cardIds: state.byId[deck_id].cardIds.concat(id)
          }
        }
      };
    }

    default:
      return state;
  }
};

const cards = (state = { byId: {} }, action) => {
  switch (action.type) {
    case RECEIVE_CARDS: {
      const stateCopy = { ...state };
      const cards = action.cards;

      cards.forEach(card => {
        stateCopy.byId[card.id] = card;
      });

      return stateCopy;
    }

    case ADD_CARD: {
      const { card } = action;

      return {
        ...state,
        byId: {
          ...state.byId,
          [card.id]: card
        }
      };
    }

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  decks,
  cards
});

export default rootReducer;
