import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { Container, Col, Row, Form, Button } from "react-bootstrap";

function AddMeal(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [diet, setDiet] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [date, setDate] = useState("");
    const [imageSelected, setImageSelected] = useState("")
    const { user } = useContext(AuthContext);
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    const storedToken = localStorage.getItem("authToken");
    let imageUrl;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("");
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "Meal-next-door");
        const dietArr = diet.map(e => e.value)

        axios
            .post("https://api.cloudinary.com/v1_1/dz4ahgzwz/image/upload", formData)
            .then(response => {
                imageUrl = response.data.url
                return axios
                    .post(
                        `${process.env.REACT_APP_API_URL}/meals`, { title, description, diet: dietArr, cuisine, date, cookId: user?._id, image: imageUrl }, { headers: { Authorization: `Bearer ${storedToken}` } })
            })
            .then((response) => {
                setTitle("");
                setDescription("");
                setDiet("");
                setCuisine("");
                setDate("");
                navigate(`/meals`);
                props.getAllMeals();
            })
            .catch((error) => {
                setErrorMsg("oops, error posting a new meal");
                console.log(error)
            });
    };

    const uploadImage = () => {
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "Meal-next-door")
    };

    const handleSelect = (e) => {
        setDiet(e)
        setIsValid(true)
    };

    // Select options
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

        <Container style={{ marginTop: '5rem' }}>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col lg={6}>
                    <h3 style={{ textTransform: 'uppercase', letterSpacing: '1.5px' }}>Add a meal</h3>

                    {errorMsg &&
                        <p style={{ marginTop: '3rem', backgroundColor: '#E8F2E8' }}>
                            {errorMsg}
                        </p>
                    }

                    <Form onSubmit={handleSubmit}>
                        <Form.Group style={{ marginTop: '1.5rem', textAlign: 'left', fontWeight: 'bold' }}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group style={{ marginTop: '1.5rem', textAlign: 'left', fontWeight: 'bold' }}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                as="textarea"
                                placeholder="Your message to the cook"
                                style={{ height: '100px' }}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group style={{ marginTop: '1.5rem', textAlign: 'left' }}>
                            <Form.Label><strong>Diet</strong></Form.Label>
                            <Select options={options} onChange={handleSelect} placeholder="Select special diet" isMulti />
                        </Form.Group>

                        <Form.Group style={{ marginTop: '1.5rem', textAlign: 'left', fontWeight: 'bold' }}>
                            <Form.Label>Cuisine</Form.Label>
                            <Form.Select value={cuisine} onChange={(e) => setCuisine(e.target.value)} required>
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
                            </Form.Select>
                        </Form.Group>

                        <Form.Group style={{ marginTop: '1.5rem', textAlign: 'left', fontWeight: 'bold' }}>
                            <Form.Label>Preparation Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group style={{ marginTop: '1.5rem', textAlign: 'left', fontWeight: 'bold' }}>
                            <Form.Label>Picture</Form.Label>
                            <Form.Control type="file" onChange={(e) => { setImageSelected(e.target.files[0]) }} required />
                        </Form.Group>

                        {!isValid &&
                            <p style={{ marginTop: '3rem', backgroundColor: '#E8F2E8' }}>
                                You must fill in all fields to be able to submit
                            </p>}

                        <Button
                            onSubmit={uploadImage}
                            type="submit"
                            disabled={!isValid}
                            style={{
                                backgroundColor: '#3E5D3E',
                                color: '#fff',
                                border: 'none',
                                padding: '5px 20px',
                                marginTop: '2rem',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                fontSize: '14px'
                            }}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddMeal;