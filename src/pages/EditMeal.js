import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


function EditMeal(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [diet, setDiet] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [date, setDate] = useState("");
    const [cook, setCook] = useState("");


    const { mealId } = useParams();
    const navigate = useNavigate();

    const storedToken = localStorage.getItem("authToken");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/meals/${mealId}`)
            .then((response) => {
                const mealToUpdate = response.data;
                setTitle(mealToUpdate.title);
                setDescription(mealToUpdate.description);
                setDiet(mealToUpdate.diet);
                setCuisine(mealToUpdate.cuisine);
                setDate(mealToUpdate.date);
                setCook(mealToUpdate.cook);
            })
            .catch((error) => console.log(error));

    }, [mealId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, description, diet, cuisine, date, cook };

        axios
            .put(`${process.env.REACT_APP_API_URL}/meals/${mealId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                navigate(`/meals/${mealId}`)
            });
    };


    return (
        <div className="EditProjectPage">
            <h3>Edit the Project</h3>

            <form onSubmit={handleFormSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

<label>Diet:</label>
                <textarea
                    name="diet"
                    value={diet}
                    onChange={(e) => setDiet(e.target.value)}
                />

<label>Cuisine:</label>
                <textarea
                    name="cuisine"
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                />

<label>Date:</label>
                <textarea
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

<label>Cook:</label>
                <textarea
                    name="cook"
                    value={cook}
                    onChange={(e) => setCook(e.target.value)}
                />

                <button type="submit">Update your meal</button>
            </form>
        </div>
    );
}

export default EditMeal;