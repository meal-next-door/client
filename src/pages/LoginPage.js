import axios from "axios";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const { storeToken, authenticateUser } = useContext(AuthContext);
    const navigate = useNavigate();


    // Functionality to LOGIN
    const handleSubmit = (e) => {
        e.preventDefault();

        const body = { username, password };

        axios.post(`${process.env.REACT_APP_API_URL}/login`, body)
            .then((response) => {
                // Returns a response with the JWT string
                storeToken(response.data.authToken); // store token in browser
                authenticateUser();
                navigate('/');
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription);
            })
    };

    return (

        <Container>
            <Form onSubmit={handleSubmit}>
                <Row className="justify-content-md-center">
                    <Col xs={4} xl={6} align>
                        <Form.Group style={{ textAlign: "left", fontWeight: "bold" }} className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" value={username}
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
                        <div>
                            {errorMessage}
                        </div>
                        <Button type="submit" style={{ backgroundColor: '#3E5D3E', color: '#fff', borderRadius: '15px', padding: '5px 20px', border: "none" }}>
                            Login
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Container>
    );
}


export default LoginPage;