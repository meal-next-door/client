import React, { useState, useEffect } from "react";
import axios from "axios";


const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    }

    // Check if there is a token in localstorage
    const authenticateUser = () => {
        const storedToken = localStorage.getItem('authToken');

        if (storedToken) {
            axios.get(
                `${process.env.REACT_APP_API_URL}/verify`,
                { headers: { Authorization: `Bearer ${storedToken}` } } // Send the JWT token in the request's "Authorization" Headers
            )
                .then((response) => {  // Then verify the token
                    const payload = response.data;

                    setIsLoggedIn(true);
                    setIsLoading(false);
                    setUser(payload);
                })
                .catch((error) => {
                    setIsLoggedIn(false);
                    setIsLoading(false);
                    setUser(null);
                });
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    }

    // Upon logout, remove token from localStorage and update state variables
    const removeToken = () => {
        localStorage.removeItem("authToken");
    }

    const logOutUser = () => {
        removeToken();
        authenticateUser();
    }

    useEffect(() => {
        authenticateUser();
    }, []);


    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext };
