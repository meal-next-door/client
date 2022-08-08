import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context"
import { useState } from "react";

function MealsList(props) {

    const { user } = useContext(AuthContext);


    const [search, setSearch] = useState("");


    const handleSearch = (event) => {
        setSearch(event)

        props.setMeals(() => {
            const filterResult = props.mealsCopy.filter(e => {
                return e.title.toLowerCase().includes(event.toLowerCase())
            })
            return filterResult;
        })
    }


    return (
        <div className="MealsList">

            {user?.role === "cook"
                ? <NavLink to="/create-meal">
                    <button>Add your own meal</button>
                </NavLink>

                : <p> </p>
            }

            <form>
                <label>Search</label>
                <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)} />
            </form>

            {props.meals?.map((meal) => {
                return (
                    <div className="meals card" key={meal._id} >
                        <h3>{meal.title}</h3>
                        <p>{meal.description}</p>
                        <p>{meal.diet}</p>
                        <p>Cook: {meal.cook?.username}</p>

                        <NavLink to={`/meals/${meal._id}`}>
                            <button>View details</button>
                        </NavLink>
                    </div>
                );
            })}

        </div>
    );
}

export default MealsList;