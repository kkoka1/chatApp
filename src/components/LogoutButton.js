import React from 'react';
import './LogoutButton.css';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout } = useAuth0();
    
    /* 'logout()' method will redirect users to the URL set in 'returnTo' parameter. This URL should be
    specified in 'Allowed Logout URLs' list. 
    In this case, it will be App Component rendered on http://localhost:<port-number>. 
    'window.location.origin' returns origin of the current web-page i.e. http://localhost:<port-number>. */
    return (
        <button className = "logoutButton" onClick = { () => logout( {returnTo: window.location.origin} ) }>
            Logout
        </button>
    )
}

export default LogoutButton
