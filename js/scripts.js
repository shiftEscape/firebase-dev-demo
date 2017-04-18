//- Chat Application script source
//- Alvin James Bellero <alvinb@zylun.com>

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  var username = 'Guest',
      textMessage = document.getElementById('txt-message'),
      sendButton = document.getElementById('send-button'),
      usernameElm = document.getElementsByClassName('username-elem'),
      googleLogin = document.getElementById('google-login'),
      signOut = document.getElementById('sign-out'),
      messagesList = document.getElementById('messages');

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB5SOdRZ_Y0pDnqTHru1Igtv2Cb2ZniimA",
    authDomain: "fir-dev-meetup-demo.firebaseapp.com",
    databaseURL: "https://fir-dev-meetup-demo.firebaseio.com",
    projectId: "fir-dev-meetup-demo",
    storageBucket: "fir-dev-meetup-demo.appspot.com",
    messagingSenderId: "524117790237"
  };

  firebase.initializeApp(config);
  console.info('Firebase Initialized!')

  // Create elements and append new message to chat box
  let addMessage = (chat) => {
    let li = document.createElement('li');
    let nameElm = document.createElement('h4');
    nameElm.innerText = chat.name;
    li.appendChild(nameElm);
    li.className = 'highlight';

    let messageElm = document.createElement('div');
    messageElm.innerText = chat.message;
    li.appendChild(messageElm);

    messagesList.appendChild(li);
    li.scrollIntoView(false);

    textMessage.value = '';
  };

  // Set Username Method
  let setUsername = (newUsername) => {
    if (newUsername == null) { newUsername = 'Guest'; }
    username = newUsername;
    let isLoggedIn = username != 'Guest';
    usernameElm[0].innerText = usernameElm[1].innerText = newUsername;
    signOut.style.display = isLoggedIn ? '' : 'none';
    googleLogin.style.display = isLoggedIn ? 'none' : '';
  }

  // Keypress Event for message input text
  textMessage.addEventListener('keypress', e => {
    let message = textMessage.value;
    if(e.keyCode == 13 && message !== '') {
      sendButton.click();
    }
  });

  // Click Event for Send button
  sendButton.addEventListener('click', e => {
    let message = textMessage.value;
    if(message === '') return false;
    addMessage({name: 'Guest', message: message});
  });
  
  setUsername('Guest');
  // Add reference to database child
  // var dbRef = firebase.database().ref().child('chat');
  // dbRef.on('value', snap => console.log(snap.val()));

});