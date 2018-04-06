exports.FETCH_DECKS = `SELECT d.deckname, d.score, COUNT(c.id) AS cardCount FROM decks d
INNER JOIN deck_cards dc ON d.id = dc.deck_id
INNER JOIN cards c ON dc.card_id = c.id
GROUP BY d.deckname, d.score;`