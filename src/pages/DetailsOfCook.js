import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { BsChatSquareTextFill } from 'react-icons/bs';


function CookDetailsPage() {
    const [cook, setCook] = useState(null);
    const { user } = useContext(AuthContext);
    const { cookId } = useParams();
    let navigate = useNavigate();

    console.log(user)

    const storedToken = localStorage.getItem("authToken");


    // Functionality to READ details of one cook
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


    // Funtionality to ADD FAVORITES 
    const requestBody = { favorites: cookId }

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
                    <img src={cook.image} style={{ maxHeight: '15rem', objectFit: 'cover', borderRadius: '50%' }} />
                    <h1 style={{ margin: '3rem 0 1rem 0' }} >{cook.username}</h1>
                    <p><strong>Location: </strong>{cook.address}</p>
                </>
            )}

            {user != null
                ? <NavLink to={`/profile/${user?._id}`} >
                    <button onClick={() => { addFavorite(cookId) }}>Add to favorites</button>
                </NavLink>
                : <p></p>
            }

            <NavLink to="/cooks">
                <button>Back to cooks</button>
            </NavLink>

            {user?._id !== cook?._id && user != null
                ? <NavLink to={`/new-comment/${cookId}`}>
                    <button><BsChatSquareTextFill /> Comment</button>
                </NavLink>
                : <p></p>
            }


            <h3 style={{ margin: '3rem' }} >Reviews </h3>

            {cook?.comments.length > 0
                ? cook.comments?.map((comment) => (
                    <div style={{ border: '1px solid' }}>
                        <h5>{comment.title}</h5>
                        <p>{comment.description}</p>
                        <p>Author: {comment.author.username}</p>
                    </div>
                ))
                : <p>No reviews yet for this cook</p>}

        </div>
    );
}

export default CookDetailsPage;