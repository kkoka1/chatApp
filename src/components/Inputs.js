import React, { useState } from 'react';

import './Inputs.css';
import LogoutButton from '../components/LogoutButton';

import { useAuth0 } from '@auth0/auth0-react';

import { createMessage } from '../graphql/mutations';

import API, { graphqlOperation } from '@aws-amplify/api';


const Inputs = () => {

    const[messageContent, setMessageContent] = useState('');

    const { user } = useAuth0();

    const typeMessage = async function ( typeEvent ) { 
        setMessageContent( typeEvent.target.value ); 
    };
    
    //console.log("Message ", messageContent);
    // function to send a message
    const sendMessage = async function (event) {
        // when a message is being sent after pressing the send-button, send button is disabled. 
        event.preventDefault();
        /* when the send button is clicked, it will prevent any default behavior of the parent element 
        that is triggered when the send-button is clicked. */ 
        event.stopPropagation();
        // if the message is blank disable the send-button by accessing it by it's class-name.
        const send_button = document.getElementsByClassName("sendButton");
        if(messageContent === ""){
          send_button.disabled = true;
        }
        else{
          send_button.disabled = false;
        }
        // logic to send the message.
        try {
            // message object that is to be stored in DynamoDB and to be eventually displayed to the other user.
            const messageToBeSent = {
                userEmail: user.email,
                conversationId: '1',
                content: messageContent.trim()
            };
            // to replace the message with blank space as soon as the message is sent.
            setMessageContent("");
            //console.count();
            // create a new message.
            let createMessagePromise = await API.graphql(graphqlOperation(createMessage, { input: messageToBeSent }))
            createMessagePromise.then( console.log("Message is created") )
            .catch( error => console.log("Message cannot be created ", error) );
        }
        catch (error) {
            console.log("Can't send the message ", error);
        }
    };

    return (
        <form>
            <LogoutButton/> 
            <input type = "text"
                name = "messageBody"
                placeholder = "Type your message here"
                onChange = { typeMessage } 
                value = { messageContent } />
            <button className = "sendButton" type = "button" onClick = { sendMessage }> Send </button>
        </form>
    )
}

export default Inputs
