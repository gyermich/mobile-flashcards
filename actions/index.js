export const FETCH_ALL_DECKS = 'FETCH_ALL_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const GET_DECK = 'GET_DECK'

export function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck,
    }
}

export function fetchDecks (decks) {
    return {
        type: FETCH_ALL_DECKS,
        decks,
    }
}

export function getDeck (deck) {
    return {
        type: GET_DECK,
        key,
        deck,
    }
}
