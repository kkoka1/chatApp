//import React from 'react';
import '../App.css';
import React from 'react';

import Messages from '../components/Messages';
import Inputs from '../components/Inputs';


const ChatWindow = () => {
    return (
        <div className = "chatWindow">
          <Messages/>
          <Inputs/>
        </div>
    );
};

export default ChatWindow
