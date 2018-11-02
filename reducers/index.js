import { FETCH_ALL_DECKS, ADD_DECK, GET_DECK, ADD_CARD } from '../actions'


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
    case ADD_CARD :
      const { question, answer, deck } = action.data
      let questions = { ...state }[deck.title].questions
      questions.push({ question, answer })

      return {
        ...state,
        [deck.title]: {
          title: deck.title,
          questions
        }
      }
    default :
      return state
  }
}

export default decks
