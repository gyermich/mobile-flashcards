import { AsyncStorage } from 'react-native'
import { STORAGE_KEY, formatResults } from './_dummy_data'


function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function fetchResults () {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(formatResults)
}

export function createDeck ({ entry, key }) {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [key]: entry
    }))
}

export function removeDeck (key) {
    return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  })
}
