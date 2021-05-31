import React, { useEffect, useState } from 'react';

import './Messages.css';

import { useAuth0 } from '@auth0/auth0-react';

import { onCreateMessage } from '../graphql/subscriptions';
import { messagesByConversationId } from '../graphql/queries';

import API, { graphqlOperation } from '@aws-amplify/api';

const Messages = () => {
    /* useState() hook to sets previous messages and displays the new ones in the chat-window. */
    const[messages, setMessages] = useState([]);
    // Getting 'user' object for accessing user's email-id.
    const { user } = useAuth0();

    /* The function inside useEffect hook will be called every time this Messages component
    is mounted or re-renders */
    useEffect( () => {
        /* Get the all the messages with conversation-id = 1. Further, sort them by their 
        creation-time in ascending order */ 
        let msgsByConversationIdPromise = API.graphql(graphqlOperation(messagesByConversationId, {
            conversationId: '1',
            sortDirection: 'ASC'
        }));

        /* If the above Promise resolves then fetch all the msgs from DynamoDB and store them
        in 'messages' variable using 'setMessages' method */
        msgsByConversationIdPromise.then( (response) => { 
            console.log("Messages are fetched");
            const msgs = response.data?.messagesByConversationId?.items;
            if (msgs) { 
                setMessages(msgs); 
            }
        })
        .catch( (error) => {
            console.log("Can't display messages in a sorted order ", error)
        }); 
    }, []);
  
    // To create a message bubble as soon as the send button is pressed.
    useEffect( () => {
        const subscription = API.graphql(graphqlOperation(onCreateMessage))
        .subscribe({ next: (event) => {
            setMessages( initialMessages => initialMessages.concat(event.value.data.onCreateMessage) ); 
        }});
        
        /* Once the new message is displayed, unsubscribe from the onCreateMessage subscription. */
        return () => {
            subscription.unsubscribe();
        };
    }, [messages]);

    /* Rendering the messages of the sender to the right-side of the chat-window. Similarly the messages of the recipient
    are rendered to the left side of the chat-window */
    return (
        <div className = "messages">
          { messages.map( (message) => (
              <div
              key = { message.id }
              className = { message.userEmail === user.email ? "sender" : "recipient" } > { message.content } </div>
          ))}
        </div>
    )
}

export default Messages
