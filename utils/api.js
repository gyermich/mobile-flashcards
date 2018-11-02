import { AsyncStorage } from 'react-native'
import { STORAGE_KEY, formatResults, setDummyData } from './_dummy_data'


export function fetchResults() {
  // AsyncStorage.clear()
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(formatResults)
}


export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: [],
      }
    })
  )
}

export function getDeck(deckTitle) {
  return fetchResults()
    .then((decks) => {
      return decks[deckTitle]
    })
}

export function saveDeck(deck, data) {
  return AsyncStorage.mergeItem(STORAGE_KEY,
    JSON.stringify({
      [deck]: data,
    }))
}

export function addCardToDeck(data) {
  const { question, answer, deck } = data

  return getDeck(deck.title).then((deck) => {
    deck.questions.push({
      question,
      answer,
    })
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck))
  })
}
