import { FETCH_ALL_DECKS, ADD_DECK, GET_DECK } from '../actions'


function decks (state = {}, action) {
  switch (action.type) {
    case FETCH_ALL_DECKS :
      return {
        ...state,
        ...action.data
      }
    case GET_DECK :
      return {
        ...state,
        [action.key]: action.data
    }
    case ADD_DECK :
      return {
        ...state,
        [action.data.title]: action.data
    }
    default :
      return state
  }
}

export default decks
