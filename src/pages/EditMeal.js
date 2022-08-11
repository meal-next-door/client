import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import Select from 'react-select';
import { AuthContext } from "../context/auth.context";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function EditMeal(props) {
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
    const { user } = useContext(AuthContext);

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

        <Container >
            <h1>Edit your meal</h1>
            <Form onSubmit={handleFormSubmit}>
                <Row className="justify-content-md-center">
                    <Col xs={4} xl={6} align>
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Change the Title" value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs={4} xl={6} align>
                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs={4} xl={6} align>
                <label>Select the cuisine</label>
                <Form.Select className="mb-3" aria-label="Default select example">
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
                </Col>
                </Row>
                
                <Row className="justify-content-md-center">
                    <Col xs={4} xl={6} align>
                <label>Select the diet</label>
                <Select options={options} value={diet.value} onChange={handleSelect} placeholder="Select special diet" isMulti />
                </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs={4} xl={6} align>
                <Form.Group className="mb-3">
                    <Form.Label>Cook</Form.Label>
                    <Form.Control placeholder="Disabled input" disabled type="text" name="cook" value={cook} onChange={(e) => setCook(e.target.value)} />
                </Form.Group>
                </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs={4} xl={6} align>
                <Form.Group controlId="dob">
                    <Form.Label>When did you cook this meal</Form.Label>
                    <Form.Control type="date" name="date" placeholder="Preparation date" value={date} onChange={(e) => setDate(e.target.value)} />
                </Form.Group>
                </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs={4} xl={6} align>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Your meal's picture</Form.Label>
                            <Form.Control type="file" onChange={(e) => {
                                setImageSelected(e.target.files[0])
                            }}/>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs={4} xl={6} align>
                    <Button type="submit" style={{ backgroundColor: '#3E5D3E', color: '#fff', borderRadius: '15px', padding: '5px 20px', border:"none" }}>
                            Save edits
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>

        // <div className="EditMeal">
        //     <h3>Edit your meal</h3>

        //     <form onSubmit={handleFormSubmit}>

        //         <label>Title:</label>
        //         <input
        //             type="text"
        //             name="title"
        //             value={title}
        //             onChange={(e) => setTitle(e.target.value)}
        //             required
        //         />

        //         <label>Description:</label>
        //         <textarea
        //             name="description"
        //             value={description}
        //             onChange={(e) => setDescription(e.target.value)}
        //             required
        //         />

        //         <Select options={options} value={diet.value} onChange={handleSelect} placeholder="Select special diet" isMulti />

        //         <label>Cuisine:</label>
        //         <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
        //             <option value="" disabled>Select the cuisine</option>
        //             <option value="chinese">Chinese</option>
        //             <option value="french">French</option>
        //             <option value="greek">Greek</option>
        //             <option value="indian">Indian</option>
        //             <option value="italian">Italian</option>
        //             <option value="japanese">Japanese</option>
        //             <option value="lebanese">Lebanese</option>
        //             <option value="mediterranean">Mediterranean</option>
        //             <option value="mexican">Mexican</option>
        //             <option value="lebanese">Peruvian</option>
        //             <option value="lebanese">Spanish</option>
        //             <option value="thai">Thai</option>
        //         </select>

        //         <label>Date:</label>
        //         <input
        //             type="date"
        //             name="date"
        //             value={date}
        //             onChange={(e) => setDate(e.target.value)}
        //             required
        //         />

        //         <label>Cook:</label>
        //         <input
        //             type="text"
        //             name="cook"
        //             value={cook}
        //             onChange={(e) => setCook(e.target.value)}
        //             readOnly
        //             required
        //         />

        //         <input
        //             type="file"
        //             onChange={(e) => {
        //                 setImageSelected(e.target.files[0])
        //             }}
        //         />

        //         {!isValid && <p>You must fill in all fields to be able to update</p>}
        //         <button onClick={uploadImage} type="submit" disabled={!isValid}>Update</button>
        //         <NavLink to={`/meals/${mealId}`}><button>Back to meal details</button></NavLink>

        //     </form>
        // </div>
    );
}

export default EditMeal;