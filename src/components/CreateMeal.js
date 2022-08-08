import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function AddMeal(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [diet, setDiet] = useState("vegetarian");
    const [cuisine, setCuisine] = useState("french");
    const [date, setDate] = useState("");
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    const storedToken = localStorage.getItem("authToken");

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("");
        const requestBody = { title, description, diet, cuisine, date, cookId: user?._id };

        props.refreshMeals((prevMeals) => {
            return [requestBody, ...prevMeals];
        })

        axios
            .post(
                `${process.env.REACT_APP_API_URL}/meals`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                setTitle("");
                setDescription("");
                setDiet("");
                setCuisine("");
                setDate("");
                navigate(`/meals`)
            })
            .catch((error) => {
                setErrorMsg("oops, error posting a new meal");
                console.log(error)
            });
    };

    return (
        <div className="AddMeal">
            <h3>Add Meal</h3>

            {errorMsg &&
                <p className="error">
                    {errorMsg}
                </p>
            }

            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Diet:</label>
                <select value={diet} onChange={(e) => setDiet(e.target.value)}>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten-free">Gluten-free</option>
                    <option value="dairy-free">Dairy-free</option>
                    <option value="allergens-free">Allergens-free</option>
                    <option value="sugar-free">Sugar-free</option>
                    <option value="kosher">Kosher</option>
                    <option value="halal">Halal</option>
                    <option value="none">None</option>
                </select>

                <label>Cuisine:</label>
                <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                    <option value="italian">Italian</option>
                    <option value="mexican">Mexican</option>
                    <option value="greek">Greek</option>
                    <option value="french">French</option>
                    <option value="indian">Indian</option>
                    <option value="thai">Thai</option>
                    <option value="mediterranean">Mediterranean</option>
                    <option value="japanese">Japanese</option>
                    <option value="chinese">Chinese</option>
                    <option value="lebanese">Lebanese</option>
                </select>

                <label>Preparation date:</label>
                <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <button type="submit">Submit</button>
            </form>

        </div>
    );
}

export default AddMeal;