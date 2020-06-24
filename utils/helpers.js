import {AsyncStorage} from 'react-native'

export const DECKS_STORAGE_KEY = 'decks'
  
export async function getDecks(){
    
    return JSON.parse(await AsyncStorage.getItem(DECKS_STORAGE_KEY));
}

export async function getDeck(id){
   return await getDecks().then((result)=>{
      const data = result!==null ? result[id]: undefined
        return data
    })
}

export async function saveDeckTitle(title){
  return await AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify({
          [title]:{
            title: title,
            questions:[],
          }
        }))
}

export async function removeDeck(title){
  return await AsyncStorage.getItem(title).then((deck)=>{
      const d=JSON.parse(deck)
      d[title]=undefined
      delete d[title]
     AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(d))
  })
}

export async function addCardToDeck(card, title){
  return await AsyncStorage.getItem(DECKS_STORAGE_KEY).then((decks)=>{
    const data=JSON.parse(decks)
      const questions=data[title].questions ? data[title].questions : []
      questions.push(card)
      data[title].questions=questions
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify(data[title]))
  })
}
