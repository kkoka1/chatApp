import logo from './logo.svg';
import './App.css';

import Split from 'react-split'
import React, { useEffect, useState } from 'react';


import API, { graphqlOperation } from '@aws-amplify/api';
import { listMessages } from './graphql/queries';

import '@aws-amplify/pubsub';
import { createMessage } from './graphql/mutations';


function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
