import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function SignupPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("cook");

    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        const body = { username, password, address, role };

        // Send input from user to the API
        axios.post(`${process.env.REACT_APP_API_URL}/signup`, body)
            .then((response) => {
                navigate('/login'); // If request is successful, redirect to login page
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription); // If the request fails, set the error message in the state
            })
    };


    return (
        <div className="SignupPage">
            <h1>Sign Up</h1>

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

                <label>Address:</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <label>Role:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="cook">Cook</option>
                    <option value="customer">Customer</option>
                    <option value="both">Both</option>
                </select>

                <button type="submit">Sign Up</button>
            </form>


            <p>Already have account?</p>
            <Link to={"/login"}> Login</Link>
        </div>
    );
}

export default SignupPage;