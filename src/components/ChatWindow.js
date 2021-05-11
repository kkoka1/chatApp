//import React from 'react';
import '../App.css';
import React, { useEffect, useState } from 'react';

import API, { graphqlOperation } from '@aws-amplify/api';

import { byUserName } from '../graphql/queries';
import { createMessage } from '../graphql/mutations';
import { onCreateMessage } from '../graphql/subscriptions';

import { useAuth0 } from '@auth0/auth0-react';

import LogoutButton from '../components/LogoutButton';

import { Amplify, Auth } from 'aws-amplify';
import { AmplifySignOut } from '@aws-amplify/ui-react';
/*import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);*/

const ChatWindow = () => {
    const[messageContent, setMessageContent] = useState('');
    const[messages, setMessages] = useState([]);
    const { user, isAuthenticated } = useAuth0();
    console.log("User details ", user.email);
    console.log("Message is ", messageContent);
    useEffect( () => { 
        API.graphql(graphqlOperation(byUserName, {
          userName: user.email,
          sortDirection: 'ASC'
        }))
        .then( (response) => { const items = response.data?.byUserName?.items;
        if (items) { 
          setMessages(items); 
        }
    
      }); 
    }, []);

    
    const typeMessage = (event) => { 
        setMessageContent(event.target.value); 
    };
    
    const sendMessage = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        try{
          const messageToBeSent = {
              userName: user.email,
              content: messageContent.trim()
          };
          console.log("Message Object is ", messageToBeSent);
          setMessageContent('');
          console.count();
          await API.graphql(graphqlOperation(createMessage, { input: messageToBeSent })).then( console.log("Message is created") )
          .catch( console.log("Message cannot be created") );
        }
        catch (error){
            console.warn(error);
        }
    };

    return (
        //isAuthenticated && (
        <div className = "chatWindow">
          <LogoutButton/>
          <div className = "messages">
          { messages.map( (message) => (
              <div
              key = { message.id }
              className = { message.userName === user.email ? "me" : "message" } > { message.content } </div>
          ))}
          </div>
          <form>
            <input type = "text"
                name = "messageBody"
                placeholder = "Type your message here"
                onChange = {typeMessage}
                value = {messageContent} />
            <button type = "button" onClick = {sendMessage}> Send </button>
          </form> 
        </div>
        //)
    );
};

export default ChatWindow
