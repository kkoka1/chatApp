import logo from './logo.svg';
import './App.css';

import Split from 'react-split'
import React, { useEffect, useState } from 'react';


import API, { graphqlOperation } from '@aws-amplify/api';
import { getMessages, listMessages } from './graphql/queries';

import '@aws-amplify/pubsub';
import { createMessage } from './graphql/mutations';



function App() {
  
  const sendMessage = () => {}
  return (
    <div className = "chatWindow">
      <div className = "messages">
          <div className = "message">
          HI my name is xyxcycycycycycyycycycycycycy....
          </div>
          <div className = "me">
          Hello this is my first message.
          </div>
          <div className = "me">
          Hey man how are you?
          </div>
      </div>
      <form action = {sendMessage}>
        <input type = "text"
            name = "messageContent"
            placeholder = "Type your message here"
            value = {''} />
        <button type = "button"> Send </button>
      </form>
      
    </div>
  );
};

export default App;
