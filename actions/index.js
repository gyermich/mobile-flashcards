export const FETCH_ALL_DECKS = 'FETCH_ALL_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const GET_DECK = 'GET_DECK'

export function addDeck(data) {
    return {
        type: ADD_DECK,
        data,
    }
}

export function fetchDecks(data) {
    return {
        type: FETCH_ALL_DECKS,
        data,
    }
}

export function fetchDeck(key, data) {
    return {
        type: GET_DECK,
        key,
        data,
    }
}
