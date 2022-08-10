import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";


function ProfilePage() {
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
            { user?.favorites 
            ? user?.favorites.map((favorite) => (
                    <div id={favorite._id}>
                        <h3>{favorite.username}</h3>
                        <h4>Address:</h4>
                        <p>{favorite.address}</p>
                    </div>
                    ))
            :<p>You don't have any favorite cooks yet</p>
            }        

            <h1>Reviews</h1>
            { user?.comments 
            ? user?.comments.map((comment) => (
                    <div id={comment._id}>
                        <h3>{comment.title}</h3>
                        <p>{comment.description}</p>
                        <p>{comment.author.username}</p>
                    </div>
                    ))
            :<p>You don't have any reviews yet</p>
            } 
            <NavLink to="/">
                <button>Back to home</button>
            </NavLink>
        </div>
    );
}

export default ProfilePage;