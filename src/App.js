import logo from './logo.svg';
import './App.css';

import Split from 'react-split'

import awsExports from './aws-exports';

import Amplify from '@aws-amplify/core';

import LoginPage from './components/LoginPage';

import ChatWindow from './components/ChatWindow';

import { useAuth0 } from '@auth0/auth0-react';

Amplify.configure(awsExports);


function App() {
  const { isAuthenticated, isLoading, error } = useAuth0();
  console.log("Auth info is ", useAuth0());
  if(isLoading){
    return <div> Loading... </div>;
  }

  if(error){
    return <div> Error... </div>;
  }

  return (
    <div>
      { isAuthenticated ? <ChatWindow/> : <LoginPage/> }
    </div>
  );
};

export default App;
