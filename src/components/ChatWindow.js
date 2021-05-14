//import React from 'react';
import '../App.css';
import React, { useEffect, useState } from 'react';

import API, { graphqlOperation } from '@aws-amplify/api';

import { messagesByConversationId, listMessages } from '../graphql/queries';
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
    //console.log("User details ", user.email);
    //console.log("Message is ", messageContent);
    //console.log("List messages query is ", listMessages);
    //console.log("Curr time in AWS format is ", new Date().toISOString());
    useEffect( () => { 
        API.graphql(graphqlOperation(messagesByConversationId, {
          conversationId: '1',
          sortDirection: 'ASC'
        }))
        .then( (response) => { //console.log("Msgs sorted ");
        const items = response.data?.messagesByConversationId?.items;
        //console.log("Items are ", items);
        if (items) { 
          setMessages(items); 
        }
    
      })
      .catch( (error) => console.log("Can't display messages in a sorted order ", error)); 
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
              conversationId: '1',
              content: messageContent.trim()
          };
          //console.log("Message Object is ", messageToBeSent);
          setMessageContent('');
          console.count();
          await API.graphql(graphqlOperation(createMessage, { input: messageToBeSent })).then( console.log("Message is created") )
          .catch( error => console.log("Message cannot be created ", error) );
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
              //console.log("Message username is ", message.userName);
              <div
              key = { message.id }
              className = {message.userName === user.email ? "me" : "message"} > { message.content } </div>
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
