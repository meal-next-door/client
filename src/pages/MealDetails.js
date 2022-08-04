import { useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


function MealDetails() {
    const [meal, setMeal] = useState([]);

    const { mealId } = useParams();

    const getMeal = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/meals/${mealId}`)
            .then((response) => setMeal(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getMeal();
    }, []);

    return (
        <div className="MealsList">
            {meal &&
                    <div className="meal card" key={meal._id} >
                            <h3>{meal.title}</h3>
                            <p>Description: {meal.desciption}</p>
                            <p>Diet: {meal.diet}</p>
                            <p>Cuisine: {meal.cuisine}</p>
                            <p>Preparation date: {meal.date}</p>
                            <p>Cook: {meal.cook.username}</p>
                    </div>
            }
        </div>
    );
}

export default MealDetails;