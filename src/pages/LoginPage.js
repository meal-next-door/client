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


    const handleSubmit = (e) => {
        e.preventDefault();

        const body = { username, password };

        axios.post(`${process.env.REACT_APP_API_URL}/login`, body)
            .then((response) => {
                // Returns a response with the JWT string
                storeToken(response.data.authToken); // store token in browser
                authenticateUser();
                navigate('/');
                window.location.reload();
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription);
            })
    };


    return (
        <Container style={{ marginTop: '5rem' }}>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col lg={6}>
                    <h3 style={{ textTransform: 'uppercase', letterSpacing: '1.5px' }}>Login</h3>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group style={{ marginTop: '1.5rem', textAlign: 'left', fontWeight: 'bold' }} className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group style={{ marginTop: '1.5rem', textAlign: 'left', fontWeight: 'bold' }} className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <div>
                            {errorMessage}
                        </div>

                        <Button type="submit" style={{ backgroundColor: '#3E5D3E', color: '#fff', border: "none", padding: '5px 20px', margin: '2rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px' }}>
                            Login
                        </Button>

                        <p>Not registered yet? <NavLink to={"/signup"}>Sign up</NavLink></p>
                    </Form>

                </Col>
            </Row>
        </Container>
    );
}


export default LoginPage;