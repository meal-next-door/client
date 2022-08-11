import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Image } from "cloudinary-react";
import { Container, Col, Row, Form } from "react-bootstrap";
import { FaTrashAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';

function MealDetails(props) {
    const [meal, setMeal] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);

    const storedToken = localStorage.getItem("authToken");

    const { user } = useContext(AuthContext);
    const { mealId } = useParams();
    let navigate = useNavigate();


    // Functionality to READ the details of a meal
    const getMeal = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/meals/${mealId}`)
            .then((response) => setMeal(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getMeal();
    }, []);


    // Functionality to DELETE a meal
    const deleteMeal = () => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/meals/${mealId}`)
            .then(() => {
                props.refreshMeals();
            })
            .then(() => {
                return (
                    navigate("/meals", { replace: true })
                )
            })
            .catch((error) => console.log(error));
    }


    // Functionality to ADD FAVORITES
    const addFavorite = () => {
        axios
            .put(`${process.env.REACT_APP_API_URL}/users/${user?._id}`)
            .then(() => {
                return (
                    navigate(`/users/${user?._id}`, { replace: true })
                )
            })
            .catch((error) => console.log(error));
    }


    // Functionality to SEND EMAIL to the cook
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSent(true);

        const requestBody = { email, subject, message };

        axios
            .post(
                `${process.env.REACT_APP_API_URL}/orders`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                setEmail("");
                setSubject("");
                setMessage("");
            })
            .catch((error) => {
                setErrorMsg("oops, there has been an error sending your email");
                console.log(error)
            });
    };

    return (
        <>

            {meal &&
                <div className="meal card" key={meal._id} >

                    {meal.image
                        ? <img src={meal.image} style={{ width: '100%', maxHeight: '60vh', backgroundSize: 'cover', backgroundPosition: 'center', objectFit: 'cover' }} />
                        : <p>Noimages for this meal</p>
                    }

                    <Container>
                        <Row>
                            <Col md={4} lg={6}></Col>
                            <Col md={8} lg={6} style={{ marginTop: '1.5rem' }}>
                                <NavLink to={`/cooks/${meal.cook?._id}`} >
                                    <button style={{ padding: '0.2rem 1rem', borderRadius: '10px' }}><CgProfile /> {meal.cook?.username}'s</button>
                                </NavLink>

                                {user?._id === meal.cook?._id
                                    ? <>
                                        <NavLink to={`/edit-meal/${mealId}`} >
                                            <button style={{ padding: '0.2rem 1rem', margin: '0.5rem', borderRadius: '10px' }}><FiEdit /></button>
                                        </NavLink>
                                        <button onClick={() => { deleteMeal(mealId) }} style={{ padding: '0.2rem 1rem', borderRadius: '10px', borderColor: 'red' }}><FaTrashAlt style={{ color: 'red' }} /></button>
                                    </>
                                    : <p> </p>
                                }
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <h3 style={{ margin: '2rem' }}>{meal.title}</h3>

                                {meal.diet?.map(e => {
                                    return <span style={{ margin: '0.4rem', backgroundColor: '#E8F2E8', color: 'black', border: 'none', borderRadius: '20px', padding: '10px 20px' }}>{e}</span>
                                })}

                                <p style={{ marginTop: '2rem' }}><strong>Cuisine:</strong>  {meal.cuisine}</p>
                                <p><strong>Preparation date:</strong>  {meal.date}</p>
                                <p><strong>Cooked by:</strong> {meal.cook?.username}</p>

                                <p style={{ margin: '4rem' }}>{meal.description}</p>
                            </Col>
                        </Row>
                    </Container>

                </div>
            }


            {errorMsg &&
                <p className="error">
                    {errorMsg}
                </p>
            }


            {user != null
                ? <Container style={{ marginTop: '5rem' }}>
                    <h3 style={{ textTransform: 'uppercase', letterSpacing: '1.5px' }}>Contact</h3>

                    {!sent ? (
                        <Form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
                            <Form.Group style={{ marginTop: '1rem' }}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Your email address"></Form.Control>
                            </Form.Group>

                            <Form.Group style={{ marginTop: '1rem' }}>
                                <Form.Label>Subject</Form.Label>
                                <Form.Control type="text" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required placeholder="The purpose of your email"></Form.Control>
                            </Form.Group>

                            <Form.Group style={{ marginTop: '1rem' }}>
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    as="textarea"
                                    placeholder="Your message to the cook"
                                    style={{ height: '100px' }}>
                                </Form.Control>
                            </Form.Group>

                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#3E5D3E',
                                    color: '#fff',
                                    borderRadius: '15px',
                                    padding: '5px 20px',
                                    marginTop: '2rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    fontSize: '14px'
                                }}>
                                Send message
                            </button>

                        </Form>
                    ) : (
                        <>
                            <h5>Your email has been successfully sent!</h5>
                            <h6>{meal.cook?.username} will soon confirm your order</h6>
                            <NavLink to="/meals"><button>Back to meals</button></NavLink>
                        </>
                    )}

                </Container>
                : <p></p>
            }



        </>
    );
}

export default MealDetails;