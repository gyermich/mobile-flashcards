import { FETCH_ALL_DECKS, ADD_DECK, GET_DECK } from '../actions'


function decks (state = {}, action) {
  switch (action.type) {
    case FETCH_ALL_DECKS :
      return {
        ...state,
        decks: action.decks,
      }
    case GET_DECK :
      return {
        ...state,
        [action.key]: action.deck
    }
    case ADD_DECK :
      return {
        ...state,
        [action.deck.title]: {
            title: action.deck.title,
            questions: [],
        },
    }
    default :
      return state
  }
}

export default decks
