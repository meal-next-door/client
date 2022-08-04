import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function MealDetails() {
    //modifier à partir d'ici
    const [meals, setMeals] = useState([]);

    const getAllMeals = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/meals`)
            .then((response) => setMeals(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllMeals();
    }, []);

    return (
        <div className="MealsList">

            {meals?.map((meal) => {
                return (
                    <div className="meals card" key={meal._id} >
                        <Link to={`/cooks/${meal._id}`}>
                            <h3>{meal.title}</h3>
                            <p>Description: {meal.desciption}</p>
                            {meals.diet.map((diet) => {
                                    return (
                                        <p>{meal.diet}</p>
                                    )
                                })}
                            <p>Cuisine: {meal.cuisine}</p>
                            <p>Preparation date: {meal.date}</p>
                            <p>Cook: {meal.cook}</p>
                        </Link>
                    </div>
                );
            })}

        </div>
    );
}

export default MealDetails;