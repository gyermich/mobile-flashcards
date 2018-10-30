import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'DUMMYKEY'

export function formatResults (results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}

function setDummyData () {
  const dummyData = [
  {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
  {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  ]

  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData))

  return dummyData
}