import {RECEIVE_DECKS,ADD_CARD_DECK,ADD_DECK/*,REMOVE_DECK*/} from '../actions/decks.js'

export default function decks(state={}, action){
    switch(action.type){
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return{
                ...state,
                [action.title]:{
                    title: action.title,
                    questions:[]
                }
                    
            }
        case ADD_CARD_DECK:
            console.log('ADD_CARD_DECK->' + JSON.stringify(state) + ' ' + JSON.stringify(action[action.title]))
            return{
                ...state,
                [action.title]:{
                    ...state[action.title],
                    questions:state[action.title].questions.concat(action.card)
                }
            }
        default: 
            return state;
    }
}