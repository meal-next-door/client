import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


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


    // Functionality to READ the details of a meal
    const getMeal = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/meals/${mealId}`)
            .then((response) => setMeal(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getMeal();
    }, []);


    // Functionality to DELETE a meal
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


    // Functionality to ADD FAVORITES
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


    // Functionality to SEND EMAIL to the cook
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
                setErrorMsg("oops, there has been an error sending your email");
                console.log(error)
            });
    };



    return (
        <>
            <div className="MealsList">
                {meal &&
                    <div className="meal card" key={meal._id} >
                        <h3>{meal.title}</h3>

                        {meal.diet?.map(e => {
                            return <span key={e}>{e} </span>
                        })}

                        <p>Cuisine: {meal.cuisine}</p>
                        <p>Preparation date: {meal.date}</p>
                        <p>Cooked by: {meal.cook?.username}</p>

                        <NavLink to={`/cooks/${meal.cook?._id}`} >
                            <button>View {meal.cook?.username}'s profile</button>
                        </NavLink>

                        {user?._id === meal.cook?._id
                            ? <>
                                <NavLink to={`/edit-meal/${mealId}`} >
                                    <button>Edit</button>
                                </NavLink>
                                <button onClick={() => { deleteMeal(mealId) }}>Delete</button>
                            </>
                            : <p> </p>
                        }

                        <p>Description: {meal.description}</p>
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
                    <>
                        <h4>Your email has been successfully sent!</h4>
                        <h5>{meal.cook?.username} will soon confirm your order</h5>
                        <NavLink to="/meals"><button>Back to meals</button></NavLink>
                    </>
                )}

            </div>

        </>
    );
}

export default MealDetails;