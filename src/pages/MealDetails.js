import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Image } from "cloudinary-react";


function MealDetails(props) {
    const [meal, setMeal] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);

    const storedToken = localStorage.getItem("authToken");

    const { user } = useContext(AuthContext);
    const { mealId } = useParams();
    let navigate = useNavigate();

    const getMeal = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/meals/${mealId}`)
            .then((response) => setMeal(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getMeal();
    }, []);


    const deleteMeal = () => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/meals/${mealId}`)
            .then(() => {
                props.refreshMeals();
            })
            .then(() => {
                return (
                    navigate("/meals", { replace: true })
                )
            })
            .catch((error) => console.log(error));
    }

    const addFavorite = () => {
        axios
        .put(`${process.env.REACT_APP_API_URL}/users/${user?._id}`)
        .then(() => {
            return (
            navigate(`/users/${user?._id}`, { replace: true })
            )
            })
        .catch((error) => console.log(error));
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSent(true);

        const requestBody = { email, subject, message };

        axios
            .post(
                `${process.env.REACT_APP_API_URL}/orders`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                setEmail("");
                setSubject("");
                setMessage("");
            })
            .catch((error) => {
                setErrorMsg("oops, error sending order");
                console.log(error)
            });
    };

    return (
        <>
            <div className="MealsList">
                {meal &&
                    <div className="meal card" key={meal._id} >
                        <h3>{meal.title}</h3>
                        {meal.image 
                        ? <img src={meal.image} alt="meal picture" />
                        : <p>No picture for this meal</p>
                        }
                        
                        <p>Diet: {meal.diet}</p>
                        <p>Cuisine: {meal.cuisine}</p>
                        <p>Preparation date: {meal.date}</p>
                        <p>Cook: {meal.cook?.username}</p>
                        <NavLink to={`/cooks/${meal.cook?._id}`} >
                            <button>View cook profile</button>
                        </NavLink>
                        <p>Description: {meal.description}</p>
                        {user?._id === meal.cook?._id
                            ? <>
                                <NavLink to={`/edit-meal/${mealId}`} >
                                    <button>Edit</button>
                                </NavLink>
                                <button onClick={() => { deleteMeal(mealId) }}>Delete</button>
                            </>
                            : <p> </p>}
                    </div>
                }
            </div>

            {errorMsg &&
                <p className="error">
                    {errorMsg}
                </p>
            }

            <div className="nodemailer">
                <h3>Contact</h3>

                {!sent ? (
                    <form onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <label>Subject</label>
                        <input type="text" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />

                        <label>Message</label>
                        <textarea type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} required />

                        <button type="submit">Send Email</button>
                    </form>
                ) : (
                    <h3>Email sent!</h3>
                )}

            </div>

        </>
    );
}

export default MealDetails;