//- Chat Application script source
//- Alvin James Bellero <alvinb@zylun.com>

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const textMessage = document.getElementById('txt-message');
  const sendButton = document.getElementById('send-button');

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

  let addMessage = (message) => {
    textMessage.value = '';
    alert(message);
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
    addMessage(message);
  });
  
  // Add reference to database child
  // var dbRef = firebase.database().ref().child('chat');
  // dbRef.on('value', snap => console.log(snap.val()));

});