import axios from "axios";
import { useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";


function EditMeal(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [diet, setDiet] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [date, setDate] = useState("");
    const [imageSelected, setImageSelected] = useState("")
    const { mealId } = useParams();
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("authToken");
    let imageUrl;

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
            })
            .catch((error) => console.log(error));

    }, [mealId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, description, diet, cuisine, date};
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "Meal-next-door");

        axios
            .post("https://api.cloudinary.com/v1_1/dz4ahgzwz/image/upload", formData)
            .then( response => {
                console.log(response)
                imageUrl = response.data.url
                return axios
            .put(`${process.env.REACT_APP_API_URL}/meals/${mealId}`, { title, description, diet, cuisine, date, image: imageUrl}, { headers: { Authorization: `Bearer ${storedToken}` } })
            })
            .then((response) => {
                navigate(`/meals/${mealId}`)
            });
    };
    
    const uploadImage = () => {

        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "Meal-next-door")
    }

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

                <input 
                    type="file"
                    onChange={(e) => {
                        setImageSelected(e.target.files[0])
                    }}
                />

                <button onClick={uploadImage} type="submit">Update your meal</button>
            </form>
        </div>
    );
}

export default EditMeal;