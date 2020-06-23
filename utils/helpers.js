import {AsyncStorage} from 'react-native'

export const DECKS_STORAGE_KEY = 'decks'
  
export async function getDecks(){
    
    return JSON.parse(await AsyncStorage.getItem(DECKS_STORAGE_KEY));
}

export async function getDeck(id){
   return await getDecks().then((result)=>{
      const data = result!==null ? JSON.stringify(result[id]): undefined
        return data
    })
}

export async function saveDeckTitle(title){
  return await AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify({
          [title]:{
            title: title,
            questions:[],
          }
        }))/*await getDeck(title).then((result)=>{
    
    if(result===undefined){//The deck doesnt exist*/
      /*.then( getDeck(title).then((r)=> console.log('R: ' + r)))*/
        /*return true
    }else
      return false*/
         
  //})          
        
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
    console.log(decks)
      const questions=decks[title].questions ? JSON.parse(decks[title].questions) : []
      questions.push(card)
      decks[title].questions=questions
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify(decks[title]))
  })
}
