import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';

function AddMeal(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [diet, setDiet] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [date, setDate] = useState("");

    const [isValid, setIsValid] = useState(false);

    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");

    const { user } = useContext(AuthContext);
    const storedToken = localStorage.getItem("authToken");


    //Funtionality to CREATE a meal
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("");

        const dietArr = diet.map(e => e.value)

        const requestBody = { title, description, diet: dietArr, cuisine, date, cookId: user?._id };

        axios
            .post(
                `${process.env.REACT_APP_API_URL}/meals`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                setTitle("");
                setDescription("");
                setDiet("");
                setCuisine("");
                setDate("");
                navigate(`/meals`);
                props.refreshMeals((prevMeals) => {
                    return [requestBody, ...prevMeals];
                })
            })
            .catch((error) => {
                setErrorMsg("oops, error posting a new meal");
                console.log(error)
            });
    };


    const handleSelect = (e) => {
        setDiet(e)
        setIsValid(true)
    }

    // Select options using React-Select
    const options = [
        { value: 'vegetarian', label: 'Vegetarian' },
        { value: 'vegan', label: 'Vegan' },
        { value: 'gluten-free', label: 'Gluten-free' },
        { value: 'dairy-free', label: 'Dairy-free' },
        { value: 'allergens-free', label: 'Allergens-free' },
        { value: 'sugar-free', label: 'Sugar-free' },
        { value: 'kosher', label: 'Kosher' },
        { value: 'halal', label: 'Halal' }
    ]


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
                    required
                />

                <label>Description:</label>
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />


                <Select options={options} onChange={handleSelect} placeholder="Select special diet" isMulti />

                <label>Cuisine:</label>
                <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} required>
                    <option value="" disabled selected>Select an option</option>
                    <option value="chinese">Chinese</option>
                    <option value="french">French</option>
                    <option value="greek">Greek</option>
                    <option value="indian">Indian</option>
                    <option value="italian">Italian</option>
                    <option value="japanese">Japanese</option>
                    <option value="lebanese">Lebanese</option>
                    <option value="mediterranean">Mediterranean</option>
                    <option value="mexican">Mexican</option>
                    <option value="lebanese">Peruvian</option>
                    <option value="lebanese">Spanish</option>
                    <option value="thai">Thai</option>
                </select>

                <label>Preparation date:</label>
                <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <input type="file" />

                {!isValid && <p>You must fill in all fields to be able to submit</p>}
                <button type="submit" disabled={!isValid}>Submit</button>
            </form>
        </div>
    );
}

export default AddMeal;