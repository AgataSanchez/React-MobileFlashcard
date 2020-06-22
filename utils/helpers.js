import {AsyncStorage} from 'react-native'

export const DECKS_STORAGE_KEY = 'decks'
  /*let decks = {
    React: {
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
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }*/
export async function getDecks(){
    
    return JSON.parse(await AsyncStorage.getItem(DECKS_STORAGE_KEY));
}

export async function getDeck(id){
    getDecks().then(result=>{
        return result[id]
    })
}

export async function saveDeckTitle(title){
  return getDecks().then((result)=>{
      console.log(result)
        AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify({
          [title]:{
            title: title,
            questions:[],
          }
          }))
         
    })          
        
}

export async function removeDeck(title){
  return AsyncStorage.getItem(title).then((deck)=>{
      const d=JSON.parse(deck)
      d[title]=undefined
      delete d[title]
      AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(d))
  })
}

export async function addCardToDeck(card, title){
  return AsyncStorage.getItem(title).then((deck)=>{
    alert(title + ' ' +deck)
      const questions=deck.questions ? JSON.parse(deck.questions) : []
      questions.push(card)
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify(questions))
  })
}
