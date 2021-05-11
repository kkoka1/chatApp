import logo from './logo.svg';
import './App.css';

import Split from 'react-split'





//import '@aws-amplify/pubsub';

import awsExports from './aws-exports';
//import Amplify from '@aws-amplify/core';

import { withAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import Amplify from '@aws-amplify/core';

import LoginButton from './components/LoginButton';

import ChatWindow from './components/ChatWindow';

import { useAuth0 } from '@auth0/auth0-react';

Amplify.configure(awsExports);


function App() {

  //console.log("User details are ", user.email);
  //console.log("MessageContent and setMessageContents are ", setMessageContent);
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      { isAuthenticated ? <ChatWindow/> : <LoginButton/> }
    </div>
    
  
  );
};

export default App;
