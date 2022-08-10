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
                setCook(mealToUpdate.cook.username);
            })
            .catch((error) => console.log(error));

    }, [mealId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, description, diet, cuisine, date, cook };

        axios
            .post("https://api.cloudinary.com/v1_1/dz4ahgzwz/image/upload", formData)
            .then( response => {
                console.log(response)
                imageUrl = response.data.url
                return axios
            .put(`${process.env.REACT_APP_API_URL}/meals/${mealId}`, { title, description, diet, cuisine, date, image: imageUrl}, { headers: { Authorization: `Bearer ${storedToken}` } })
            })
            .then((response) => {
                console.log(response)
                navigate(`/meals/${mealId}`)
            })
            .catch((error) => console.log(error));;
    };


    return (
        <div className="EditMeal">
            <h3>Edit your meal</h3>

            <form onSubmit={handleFormSubmit}>

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
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <Select options={options} value={diet.value} onChange={handleSelect} placeholder="Select special diet" isMulti />

                <label>Cuisine:</label>
                <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                    <option value="" disabled>Select the cuisine</option>
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

                <label>Date:</label>
                <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
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