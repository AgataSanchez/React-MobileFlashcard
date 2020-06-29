# React-MobileFlashcard

The objective of this application is to create and display decks and cards. Each deck will have several cards that will be answered in a 'Quiz'. In turn, within a deck you can create cards with a question and an answer and in the 'Quiz' you can see these cards and point to 'Correct' if you answered the question correctly (previously seeing the answer) or 'Incorrect' if not answered correctly. Finally, the percentage of hits of said 'Quiz' will be indicated.


## TL;DR
To get started developing right away:
   * install all project dependencies with `npm install` or `yarn install`
   * install expo application in your phone
   * start the development server with `npm start` or `yarn start`
   * scan the QR code and open it in expo
## What You're Getting
```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── App.js # This is the root of the app. Contains static HTML right now.
├── actions
|   └── decks.js # Actions to decks: AddDeck, AddCardToDeck, RemoveDeck and ReceiveDeck
├── components
|   ├── AddCard.js # Component to add a new card in the corresponding deck
|   ├── Dashboard.js # Component that contains the tabNavigator for Decks and AddDeck and show all decks
|   ├── Deck.js # Component to show deck's title, deck's card and three buttons to 'Start Quiz', 'Add Card' and 'Remove Deck' 
|   ├── NewDeck.js # Component to add new deck
|   └── Quiz.js # Component to show the Quiz. Showing the cards in the deck with the option to see the answer/question and two buttons to 'Correct' or 'Incorrect'
├── middleware  
|   ├── index.js # Apply all middlewares 
|   └── logger.js # Show actions of the aplication
├── reducers
|   └── decks.js # Reducers to switch the action.type decks
├── utils
|   └── helpers.js # Includes all functions to the app with Asyncstorage and Notifications
```
## Backend Server
To simplify your development process, we've provided a backend server for you to develop against. The provided file [`helpers.js`](utils/helpers.js) contains the methods you will need to perform necessary operations on the backend:

* [`getDecks`](#getDecks)
* [`getDeck`](#getDeck)
* [`saveDeckTitle`](#saveDeckTitle)
* [`removeDeck`](#removeDeck)
* [`addCardToDeck`](#addCardToDeck)
* [`clearNotification`](#clearNotification)
* [`setLocalNotification`](#setLocalNotification)

### `getDecks`
    
Method Signature:
```js
    getDecks()
```
Returns a Promise which resolves to a JSON object containing a collection of decks.
This collection represents the decks currently in the dashboard in your app.

### `getDeck`

Method Signature:
```js
    getDeck(id)
```
id: <String> The title of the deck
Returns a Promise which resolves to a JSON object containing a one deck.
This collection represents the deck currently in the backend in your app.

### `saveDeckTitle`

Method Signature:
```js
    _saveDeckTitle(title)
```
title: <String> The title of the deck
Returns a Promise which resolves to a JSON object containing the response data of request saveDeckTitle

### `removeDeck`

Method Signature:
```js
    _removeDeck(title)
```
title: <String> The title of the deck
Returns a Promise which resolves to a JSON object containing the response data of request removeDeck

### `addCardToDeck`

Method Signature:
```js
    addCardToDeck(card, title)
```
title: <String> The title of the deck
card: <Object> The card with the text of the question and answer
Returns a Promise which resolves to a JSON object containing the response data of request addCardToDeck

### `clearNotification`

Method Signature:
```js
    clearNotification()
```
Returns a Promise which resolves of request clearNotification

### `setLocalNotification`

Method Signature:
```js
    setLocalNotification()
```

### Create React App
This project was bootstrapped with [Create React Native App](https://github.com/expo/create-react-native-app).
