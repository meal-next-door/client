import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context"
import { useState } from "react";

function MealsList(props) {

    const { user } = useContext(AuthContext);
    const [search, setSearch] = useState("");

    // Functionality to SEARCH WITH A SEARCH BAR
    const handleSearch = (event) => {
        setSearch(event)

        props.setMeals(() => {
            const filterResult = props.mealsCopy.filter(e => {
                return e.title.toLowerCase().includes(event.toLowerCase())
            })
            return filterResult;
        })
    }


    // Functionality to SEARCH BY DIET
    const handleDiet = (dietInput) => {

        props.setMeals(() => {
            const result = props.mealsCopy?.filter(e => {
                return e.diet.includes(dietInput);
            })
            return result;
        })
    }

    const refreshList = () => {
        props.refreshMeals();
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

            <button onClick={() => handleDiet('vegetarian')}>Vegetarian</button>
            <button onClick={() => handleDiet('vegan')}>Vegan</button>
            <button onClick={() => handleDiet('gluten-free')}>Gluten-free</button>
            <button onClick={() => handleDiet('dairy-free')}>Dairy-free</button>
            <button onClick={() => handleDiet('allergens-free')}>Allergens-free</button>
            <button onClick={() => handleDiet('sugar-free')}>Sugar-free</button>
            <button onClick={() => handleDiet('kosher')}>Kosher</button>
            <button onClick={() => handleDiet('halal')}>Halal</button>
            <button onClick={() => refreshList()}>Refresh</button>


            {props.meals?.map((meal) => {
                return (
                    <div className="meals card" key={meal._id} >
                        <h3>{meal.title}</h3>

                        {meal.diet?.map(e => {
                            return <span>{e} </span>
                        })}

                        <p>Cook: {meal.cook?.username}</p>
                        <p>{meal.description}</p>

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