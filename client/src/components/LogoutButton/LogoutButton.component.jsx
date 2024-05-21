import React from 'react';
import { useNavigate } from 'react-router-dom'
import HTTPClient from '../../utils/HTTPClient.util'
import './LogoutButton.style.css';

const LogoutButton = () => {
    const navigate = useNavigate();
    
    const handleLogout = async() => {
        localStorage.removeItem("username");

        let client = new HTTPClient();

        client.logout()
            .then((response) => {
                navigate("/login");
            })
            .catch((error) => {
                console.log("Something went wrong while logging out")
                console.log(error)
            });
    }

    return(
        <div className='logout'>
            <button onClick={(event) => {handleLogout()}}>Logout</button>
        </div>
    );
}

export default LogoutButton;