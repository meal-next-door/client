import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


function MealDetails(props) {
    const [meal, setMeal] = useState([]);
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

    return (
        <div className="MealsList">
            {meal &&
                <div className="meal card" key={meal._id} >
                    <h3>{meal.title}</h3>
                    <p>Diet: {meal.diet}</p>
                    <p>Cuisine: {meal.cuisine}</p>
                    <p>Preparation date: {meal.date}</p>
                    <p>Cook: {meal.cook?.username}</p>
                    <p>Description: {meal.description}</p>
                    {user?._id === meal.cook?._id
                        ? <>
                            <NavLink to={`/edit-meal/${mealId}`} >
                                <button>Edit</button>
                            </NavLink>
                            <NavLink to={`/users/${user?._id}`} >
                                <button onClick={() => { addFavorite(user?._id) }}>Add as a favorite</button>
                            </NavLink>
                            <button onClick={() => { deleteMeal(mealId) }}>Delete</button>
                        </>
                        : <p> </p>}
                </div>
            }
        </div>
    );
}

export default MealDetails;