//- Chat Application script source
//- Alvin James Bellero <alvinb@zylun.com>

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  var username = 'Guest',
      firebaseLogo = document.getElementById('chat-logo'),
      textMessage = document.getElementById('txt-message'),
      sendButton = document.getElementById('send-button'),
      usernameElm = document.getElementsByClassName('username-elem'),
      googleLogin = document.getElementById('google-login'),
      signOut = document.getElementById('sign-out'),
      googleLoginBack = document.getElementById('google-login-back'),
      signOutBack = document.getElementById('sign-out-back'),
      uploadPhoto = document.getElementById('new-upload'),
      uploadPhotoImg = document.getElementById('image-icon'),
      fileElem = document.getElementById('file'),
      messagesList = document.getElementById('messages');

  // Control firebase logo loading
  var setLoading = (load) => {
    if(load)
      firebaseLogo.classList.add('loading');
    else
      firebaseLogo.classList.remove('loading');
  };

  var checkIfImage = (chat, li) => {
    if ( chat.message.indexOf("https://firebasestorage.googleapis.com/") == 0
      || chat.message.indexOf("https://lh3.googleusercontent.com/") == 0
      || chat.message.indexOf("http://pbs.twimg.com/") == 0
      || chat.message.indexOf("data:image/") == 0) {
      var imgElm = document.createElement("img");
      imgElm.src = chat.message;
      li.appendChild(imgElm);
    } else {
      var messageElm = document.createElement("span");
      messageElm.innerText = chat.message;
      li.appendChild(messageElm);
    }
  };

  // Create elements and append new message to chat box
  var addMessage = (chat) => {
    let li = document.createElement('li');
    let nameElm = document.createElement('h4');
    nameElm.innerText = chat.name;
    li.appendChild(nameElm);
    li.className = 'highlight';

    let messageElm = document.createElement('div');
    messageElm.innerText = chat.message;
    checkIfImage(chat, li);
    messagesList.appendChild(li);
    li.scrollIntoView(false);

    textMessage.value = '';
  };

  // Handle showing/ hiding elements
  var handleElementState = (isLoggedIn, newUsername) => {
    usernameElm[0].innerText = usernameElm[1].innerText = newUsername;
    usernameElm[0].style.display = usernameElm[1].style.display = 'inline-block';
    signOut.style.display = signOutBack.style.display = isLoggedIn ? 'inline-block' : 'none';
    googleLogin.style.display = googleLoginBack.style.display = isLoggedIn ? 'none' : 'inline-block';

  };

  // Set Username Method
  var setUsername = (newUsername) => {
    if (newUsername == null) { newUsername = 'Guest'; }
    username = newUsername;
    var isLoggedIn = username != 'Guest';
    handleElementState(isLoggedIn, newUsername);
  }

  // Handle upload click
  uploadPhoto.addEventListener('click', (e) => {
    fileElem.click();
  });

  uploadPhotoImg.addEventListener('click', (e) => {
    fileElem.click();
  });

  // Keypress Event for message input text
  textMessage.addEventListener('keypress', e => {
    var message = textMessage.value;
    if(e.keyCode == 13 && message !== '') {
      sendButton.click();
    }
  });

  //===========================================================

  // Click event to add message to chat box
  sendButton.addEventListener('click', e => {
    var message = textMessage.value;
    if(message === '') return false;
    var chat = {name: username, message: message};
    addMessage(chat);
  });

  setUsername('Guest');

});