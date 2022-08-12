import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function EditMeal() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [diet, setDiet] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [date, setDate] = useState("");
    const [cook, setCook] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [imageSelected, setImageSelected] = useState("");
    const { mealId } = useParams();
    const navigate = useNavigate();
    let imageUrl;
    const storedToken = localStorage.getItem("authToken");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/meals/${mealId}`)
            .then((response) => {
                setTitle(response.data.title);
                setDescription(response.data.description);
                setDiet(response.data.diet);
                setCuisine(response.data.cuisine);
                setDate(response.data.date);
                setCook(response.data.cook.username);
            })
            .catch((error) => console.log(error));

    }, [mealId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const dietArr = diet.map(e => e.value)

        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "Meal-next-door");

        axios
            .post("https://api.cloudinary.com/v1_1/dz4ahgzwz/image/upload", formData)
            .then(response => {
                imageUrl = response.data.url
                return axios
                    .put(`${process.env.REACT_APP_API_URL}/meals/${mealId}`, { title, description, diet: dietArr, cuisine, date, image: imageUrl }, { headers: { Authorization: `Bearer ${storedToken}` } })
            })
            .then(response => {
                navigate(`/meals/${mealId}`)
            })
            .catch((error) => console.log(error));;
    };

    const uploadImage = () => {

        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "Meal-next-door")
    };

    const handleSelect = (e) => {
        setDiet(e)
        setIsValid(true)
    }

    // Diet options for select form
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

        <Container style={{ marginTop: '5rem' }} >
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col lg={6}>
                    <h3 style={{ textTransform: 'uppercase', letterSpacing: '1.5px' }}>Edit your meal</h3>

                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group style={{ marginTop: '1.5rem', textAlign: 'left', fontWeight: 'bold' }} className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Change the Title" value={title}
                                onChange={(e) => setTitle(e.target.value)} required />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group style={{ marginTop: '1.5rem', textAlign: 'left', fontWeight: 'bold' }} className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" value={description}
                                onChange={(e) => setDescription(e.target.value)} as="textarea" style={{ height: '100px' }} required />
                        </Form.Group>

                        <Form.Group style={{ marginTop: '1.5rem', textAlign: 'left', fontWeight: 'bold' }} className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Cuisine</Form.Label>
                            <Form.Select value={cuisine} onChange={(e) => setCuisine(e.target.value)} required>
                                <option value="chinese">Chinese</option>
                                <option value="french">French</option>
                                <option value="greek">Greek</option>
                                <option value="indian">Indian</option>
                                <option value="italian">Italian</option>
                                <option value="japanese">Japanese</option>
                                <option value="lebanese">Lebanese</option>
                                <option value="mediterranean">Mediterranean</option>
                                <option value="mexican">Mexican</option>
                                <option value="peruvian">Peruvian</option>
                                <option value="spanish">Spanish</option>
                                <option value="thai">Thai</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group style={{ marginTop: '1.5rem', textAlign: 'left' }} className="mb-3" controlId="formBasicDescription">
                            <Form.Label><strong>Diet</strong></Form.Label>
                            <Select options={options} value={diet.value} onChange={handleSelect} placeholder="Select special diet" isMulti required />
                        </Form.Group>

                        <Form.Group style={{ marginTop: '1.5rem', textAlign: 'left', fontWeight: 'bold' }} className="mb-3">
                            <Form.Label>Cook</Form.Label>
                            <Form.Control placeholder="Disabled input" disabled type="text" name="cook" value={cook} onChange={(e) => setCook(e.target.value)} />
                        </Form.Group>

                        <Form.Group style={{ marginTop: '1.5rem', textAlign: 'left', fontWeight: 'bold' }} controlId="dob">
                            <Form.Label>Preparation Date</Form.Label>
                            <Form.Control type="date" name="date" placeholder="Preparation date" value={date} onChange={(e) => setDate(e.target.value)} required />
                        </Form.Group>

                        <Form.Group style={{ marginTop: '1.5rem', textAlign: 'left', fontWeight: 'bold' }} controlId="formFile" className="mb-3">
                            <Form.Label>Picture</Form.Label>
                            <Form.Control type="file" onChange={(e) => {
                                setImageSelected(e.target.files[0])
                            }} required />
                        </Form.Group>


                        {!isValid &&
                            <p style={{ marginTop: '3rem', backgroundColor: '#E8F2E8' }}>
                                You must fill in all fields to be able to submit
                            </p>}


                        <Button disabled={!isValid} type="submit" style={{ backgroundColor: '#3E5D3E', color: '#fff', borderRadius: '15px', padding: '5px 20px', border: "none" }}>
                            Save edits
                        </Button>
                    </Form>



                </Col>
            </Row>


        </Container>
    );
}

export default EditMeal;