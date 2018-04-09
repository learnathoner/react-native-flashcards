export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const DELETE_DECK = 'DELETE_DECK';

export const receiveDecks = decks => {
  return {
    type: RECEIVE_DECKS,
    decks
  };
};

export const addDeck = deck => {
  return {
    type: ADD_DECK,
    deck
  };
};

export const deleteDeck = id => {
  return {
    type: DELETE_DECK,
    id
  };
};

export const receiveCards = cards => {
  return {
    type: RECEIVE_CARDS,
    cards
  };
};

export const addCard = card => {
  return {
    type: ADD_CARD,
    card
  };
};

export const updateScore = ({ deckId, score }) => {
  return {
    type: UPDATE_SCORE,
    deckId,
    score
  };
};
