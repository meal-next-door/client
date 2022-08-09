import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";


function ProfilePage(props) {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const [imageSelected, setImageSelected] = useState("");
    const storedToken = localStorage.getItem("authToken");
    let imageUrl;

    const getUser = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/users/${userId}`)
            .then((response) => {
                setUser(response.data)
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="UserDetails">

            {user && (
                <>
                    <h1>{user.username}</h1>
                    <img src={user.image}/>
                    <p>{user.address}</p>
                    <p>{user.role}</p>
                    <NavLink to={`/edit-profile/${userId}`}>
                        <button>Edit profile</button>
                    </NavLink>
                </>
            )}

            <h1>Favorites</h1>        
            {user &&
                user.favorites.map((favorite) => (
                    <li className="CookCard card" key={favorite._id}>
                        <h3>{favorite.username}</h3>
                        <h4>Address:</h4>
                        <p>{favorite.address}</p>
                    </li>
                ))}

            <h1>Reviews</h1>

            <NavLink to="/">
                <button>Back to home</button>
            </NavLink>
        </div>
    );
}

export default ProfilePage;