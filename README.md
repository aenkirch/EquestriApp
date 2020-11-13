# EquestriApp

This project was developed in order to finish a course in ESIEA Graduate School of Engineering where I am studying in 5th year.

Related:

* [Semantic UI with React Tutorial](https://www.robinwieruch.de/react-semantic-ui-tutorial/)

## Features

* uses:
  * only React (create-react-app)
  * firebase
  * react-router
  * **semantic UI**
* features:
  * Sign In
  * Sign Up
  * Sign Out
  * Password Forget
  * Password Change
  * Verification Email
  * Protected Routes with Authorization
  * Roles-based Authorization
  * Social Logins with Google, Facebook and Twitter
  * Linking of Social Logins on Account dashboard
  * Auth Persistence with Local Storage
  * Database with Users and Messages
* relatives au projet:
  * Les cavaliers peuvent voir les cours disponibles avec des infos (fonction d'inscription aux cours non implémentée)
  * Les moniteurs peuvent créer les reprises
  * Les administrateurs peuvent créer des chevaux et les supprimer
  * Les administrateurs peuvent créer des comptes pour les moniteurs

## Installation

* `cd EquestriApp`
* `npm install`
* `npm start`
* visit http://localhost:3000

### Firebase Configuration

* copy/paste your configuration from your Firebase project's dashboard into one of these files
  * *src/components/Firebase/firebase.js* file
  * *.env* file
  * *.env.development* and *.env.production* files

The *.env* or *.env.development* and *.env.production* files could look like the following then:

```
REACT_APP_API_KEY=AIzaSyBtxZ3phPeXcsZsRTySIXa7n33NtQ
REACT_APP_AUTH_DOMAIN=react-firebase-s2233d64f8.firebaseapp.com
REACT_APP_DATABASE_URL=https://react-firebase-s2233d64f8.firebaseio.com
REACT_APP_PROJECT_ID=react-firebase-s2233d64f8
REACT_APP_STORAGE_BUCKET=react-firebase-s2233d64f8.appspot.com
REACT_APP_MESSAGING_SENDER_ID=701928454501
```

**Development:**

```
REACT_APP_CONFIRMATION_EMAIL_REDIRECT=http://localhost:3000
```

**Production:**

```
REACT_APP_CONFIRMATION_EMAIL_REDIRECT=https://mydomain.com
```