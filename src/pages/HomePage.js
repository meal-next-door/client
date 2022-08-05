import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/users`)
            .then((response) => {
                setUsers(response.data)
            })
            .catch((error) => console.log(error));
    };

    const recentUsers = [...users].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 3);

    useEffect(() => {
        getUsers();
    }, []);



    return (
        <div>
            <div className="cover">
                <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"></img>
            </div>
            <div>
                <h3>How does it work?</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div>
                <h3>Meet the community</h3>
                {recentUsers.map((user) => {
                    return (
                        <div className="UserCard card" key={user._id} >
                            <Link to={`/cooks/${user._id}`}>
                                <h3>{user.username}</h3>
                            </Link>
                        </div>
                    )
                })}
            </div>
            <div>
                <h3>Find your next meal</h3>
            </div>
            <div>
                <h3>Reviews</h3>
            </div>
        </div>
    );
}

export default HomePage;
