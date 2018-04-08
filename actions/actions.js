export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const RECEIVE_CARDS = 'RECEIVE_CARDS'
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const ADD_DECK = 'ADD_DECK';

export const receive_decks = (decks) => {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export const receive_cards = (cards) => {
  return {
    type: RECEIVE_CARDS,
    cards
  }
}