import { AsyncStorage } from 'react-native'
import { STORAGE_KEY, formatResults } from './_dummy_data'


function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function fetchResults () {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(formatResults)
}

export function createDeck (title) {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [title]: {
          title,
          questions: [],
        }
    }))
}

export function addCardToDeck(data) {
  const { question, answer, deck } = data;

  return getDeck(deck).then((data) => {
    data.questions.push({
      question,
      answer,
    })
    saveDeck(deck, data);
  })
}

export function saveDeck(deck, data) {
  return AsyncStorage.mergeItem(STORAGE_KEY,
    JSON.stringify({
      [deck]: data,
    }))
};

// export function removeDeck (key) {
//     return AsyncStorage.getItem(STORAGE_KEY)
//     .then((results) => {
//       const data = JSON.parse(results)
//       data[key] = undefined
//       delete data[key]
//       AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
//   })
// }
