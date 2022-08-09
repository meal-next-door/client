import axios from "axios";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';


function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const { storeToken, authenticateUser } = useContext(AuthContext);
    const navigate = useNavigate();


    // Functionality to LOGIN
    const handleSubmit = (e) => {
        e.preventDefault();

        const body = { username, password };

        axios.post(`${process.env.REACT_APP_API_URL}/login`, body)
            .then((response) => {
                // Returns a response with the JWT string
                storeToken(response.data.authToken); // store token in browser
                authenticateUser();
                navigate('/');
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription);
            })
    };



    return (
        <div className="LoginPage">
            <h1>Login</h1>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>

            <p>Don't have an account yet?</p>
            <NavLink to={"/signup"}> Sign Up</NavLink>
        </div>
    );
}


export default LoginPage;