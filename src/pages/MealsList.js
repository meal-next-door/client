import { useEffect, useContext } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context"

function MealsList(props) {

    const { user } = useContext(AuthContext);

    const getAllMeals = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/meals`)
            .then((response) => props.setMeals(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllMeals();
    }, []);

    return (
        <div className="MealsList">
            
            { user?.role === "cook"
            ? <button>Add your own meal</button>
            : <p> </p>
            }
            
            {props.meals?.map((meal) => {
                return (
                    <div className="meals card" key={meal._id} >
                            <h3>{meal.title}</h3>
                            <p>Description: {meal.description}</p>
                            <p>Cook: {meal.cook?.username}</p>
                        
                            <NavLink to={`/meals/${meal._id}`}>View details</NavLink>
                    </div>
                );
            })}

        </div>
    );
}

export default MealsList;