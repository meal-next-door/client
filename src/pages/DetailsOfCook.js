import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


function CookDetailsPage(props) {
    const [cook, setCook] = useState(null);
    const { user } = useContext(AuthContext);
    const { cookId } = useParams();
    let navigate = useNavigate();
    const storedToken = localStorage.getItem("authToken");
    const requestBody = { favorites: cookId }


    const getCook = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/users/${cookId}`)
            .then((response) => {
                setCook(response.data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getCook();
    }, []);


    const addFavorite = () => {
        axios
        .put(`${process.env.REACT_APP_API_URL}/users/${user?._id}/favorites`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(() => {
            return (
                navigate(`/profile/${user?._id}`, { replace: true })
            )
        })
        .catch((error) => console.log(error));
    }

    return (
        <div className="CookDetails">

            {cook && (
                <>
                    <h1>{cook.username}</h1>
                    <p>{cook.address}</p>
                </>
            )}
            <h1>Reviews: </h1>
            {cook &&
                cook.comments?.map((comment) => (
                    <>
                        <h3>{comment.title}</h3>
                        <p>{comment.description}</p>
                        <p>Author: {comment.author.username}</p>
                    </>  
                ))}
            <NavLink to={`/profile/${user?._id}`} >
                <button onClick={() => { addFavorite(cookId) }}>Add as a favorite</button>
            </NavLink>
            <NavLink to="/cooks">
                <button>Back to the list of cooks</button>
            </NavLink>
            
        </div>
    );
}

export default CookDetailsPage;