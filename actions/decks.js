export const ADD_DECK='ADD_DECK'
export const REMOVE_DECK='REMOVE_DECK'
export const ADD_CARD_DECK='ADD_CARD_DECK'
export const RECEIVE_DECKS='RECEIVE_DECKS'

export function addDeck(title){
    return{
        type: ADD_DECK,
        title
    }
}

export function removeDeck(title){
    return{
        type: REMOVE_DECK,
        title
    }
}

export function addCardDeck(title, card){
    return{
        type: ADD_CARD_DECK,
        title,
        card
    }
}

export function receiveDecks(decks){
    return{
        type: RECEIVE_DECKS,
        decks
    }
}