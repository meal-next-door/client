import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";


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
    }

    return (
        <div className="MealsList">
            {meal &&
                <div className="meal card" key={meal._id} >
                    <h3>{meal.title}</h3>
                    <p>Description: {meal.description}</p>
                    <p>Diet: {meal.diet}</p>
                    <p>Cuisine: {meal.cuisine}</p>
                    <p>Preparation date: {meal.date}</p>
                    <p>Cook: {meal.cook?.username}</p>
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
    );
}

export default MealDetails;