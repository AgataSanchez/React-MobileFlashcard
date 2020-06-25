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
  return await AsyncStorage.getItem(DECKS_STORAGE_KEY).then((decks)=>{
      const data=JSON.parse(decks)
      data[title]=undefined
      delete data[title]
     AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(data))
  })
}

export async function addCardToDeck(card, title){
  return await getDeck(title).then((deck)=>{
    const data={
      [title]:
        {questions:[
          ...deck.questions, 
          {...card}
        ]}
      }
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify(data))
  })
}
