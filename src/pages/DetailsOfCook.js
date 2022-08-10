import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


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
                    <h1>{cook.username}</h1>
                    <img src={cook.image} />
                    <p>{cook.address}</p>
                </>
            )}

            <h1>Reviews: </h1>

            {cook?.comments.length > 0
                ? cook.comments?.map((comment) => (
                    <>
                        <h3>{comment.title}</h3>
                        <p>{comment.description}</p>
                        <p>Author: {comment.author.username}</p>
                    </>
                ))
                : <p>No reviews yet for this cook</p>}

            { user != null
            ? <NavLink to={`/profile/${user?._id}`} >
                <button onClick={() => { addFavorite(cookId) }}>Add as a favorite</button>
            </NavLink>
            : <p></p>
            }

            <NavLink to="/cooks">
                <button>Back to the list of cooks</button>
            </NavLink>
            
            { user?._id !== cook?._id && user != null
            ? <NavLink to={`/new-comment/${cookId}`}>
            <button>Add a review for this cook</button>
            </NavLink>
            : <p></p>
            }

        </div>
    );
}

export default CookDetailsPage;