import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


function EditProfile(props) {
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState("");
    const [imageSelected, setImageSelected] = useState("")
    const { userId } = useParams();
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("authToken");
    let imageUrl;

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/users/${userId}`)
            .then((response) => {
                const userToUpdate = response.data;
                setUsername(userToUpdate.username);
                setAddress(userToUpdate.address);
                setImage(userToUpdate.image);
            })
            .catch((error) => console.log(error));

    }, [userId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { username, address, image };
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "Meal-next-door");

        axios
            .post("https://api.cloudinary.com/v1_1/dz4ahgzwz/image/upload", formData)
            .then( response => {
                console.log(response)
                imageUrl = response.data.url
                return axios
            .put(`${process.env.REACT_APP_API_URL}/users/${userId}`, { username, address, image: imageUrl}, { headers: { Authorization: `Bearer ${storedToken}` } })
            })
            .then((response) => {
                navigate(`/profile/${userId}`)
            });
    };
    
    const uploadImage = () => {

        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "Meal-next-door")
    }

    return (
        <div className="EditUser">
            <h3>Edit your profile</h3>

            <form onSubmit={handleFormSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Address:</label>
                <textarea
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <input 
                    type="file"
                    onChange={(e) => {
                        setImageSelected(e.target.files[0])
                    }}
                />          

                <button onClick={uploadImage} type="submit">Update your profile</button>
            </form>
        </div>
    );
}

export default EditProfile;