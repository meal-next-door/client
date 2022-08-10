import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function SignupPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("cook");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        const body = { username, password, address, role, image: "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png" };
        console.log(body)
        // Send input from user to the API
        axios.post(`${process.env.REACT_APP_API_URL}/signup`, body)
            .then((response) => {
                navigate('/login'); // If request is successful, redirect to login page
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription); // If the request fails, set the error message in the state
            })
    };


    return (

        <Container >
            <Form onSubmit={handleSubmit}>

                <Row className="justify-content-md-center">
                    <Col xs={4} xl={6} align>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Choose a username" value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs={4} xl={6} align>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs={4} xl={6} align>
                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter address" value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                            <Form.Text className="text-muted">
                                Enter your address so that customers can find your delicious meals
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs={4} xl={6} align>
                        <Form.Select aria-label="select role">
                            <option value="cook">Cook</option>
                            <option value="customer">Customer</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs={4} xl={6} align>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>

                <p>Already have account?</p>
                <NavLink to={"/login"}> Login</NavLink>
            </Form>

        </Container>
    );
}

export default SignupPage;