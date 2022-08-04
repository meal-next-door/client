import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function MealsList() {
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

    console.log(meals)

    return (
        <div className="MealsList">

            {meals?.map((meal) => {
                return (
                    <div className="meals card" key={meal._id} >
                            <h3>{meal.title}</h3>
                            <p>Description: {meal.description}</p>
                            <p>Cook: {meal.cook}</p>
                            <Link to={`/meals/${meal._id}`}></Link>
                    </div>
                );
            })}

        </div>
    );
}

export default MealsList;