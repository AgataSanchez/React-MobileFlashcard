import {RECEIVE_DECKS,ADD_CARD_DECK,ADD_DECK,REMOVE_DECK} from '../actions/decks.js'
/*const initialState = { 
    "React": {
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
  "JavaScript": {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}*/

export default function decks(state=/*initialState*/{}, action){
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
            
            return{
                ...state,
                [action.title]:{
                    ...state[action.title],
                    questions:state[action.title].questions.concat(action.card)
                }
            }
        case REMOVE_DECK:
          const newState = Object.assign({}, state)
          delete newState[action.title];
          return newState
        default: 
            return state;
    }
}