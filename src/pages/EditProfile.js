import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


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
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "Meal-next-door");

        axios
            .post("https://api.cloudinary.com/v1_1/dz4ahgzwz/image/upload", formData)
            .then(response => {
                imageUrl = response.data.url
                return axios
                    .put(`${process.env.REACT_APP_API_URL}/users/${userId}`, { username, address, image: imageUrl }, { headers: { Authorization: `Bearer ${storedToken}` } })
            })
            .then(() => {
                navigate(`/profile/${userId}`)
            });
    };

    const uploadImage = () => {
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "Meal-next-door")
    }

    return (


        <Container >
            <h1>Edit your profile information</h1>
            <Form style={{marginTop:"1.5rem"}} onSubmit={handleFormSubmit}>
                <Row className="justify-content-md-center">
                    <Col xs={4} xl={6} align>
                        <Form.Group style={{textAlign:"left", fontWeight:"bold"}} className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Change your username" value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs={4} xl={6} align>
                        <Form.Group style={{textAlign:"left", fontWeight:"bold"}} className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Address" value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs={4} xl={6} align>
                        <Form.Group style={{textAlign:"left", fontWeight:"bold"}} controlId="formFile" className="mb-3">
                            <Form.Label>Your profile picture</Form.Label>
                            <Form.Control type="file" onChange={(e) => {
                                setImageSelected(e.target.files[0])
                            }} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs={4} xl={6} align>
                        <Button type="submit" style={{ backgroundColor: '#3E5D3E', color: '#fff', borderRadius: '15px', padding: '5px 20px', margin: '1rem', border:'none' }}>
                            Save your changes
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default EditProfile;