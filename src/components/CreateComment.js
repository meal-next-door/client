import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context"
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

function AddComment() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const { user } = useContext(AuthContext);
    const { cookId } = useParams();
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState("");

    const storedToken = localStorage.getItem("authToken");

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("");

        const requestBody = { title, description, author: user?._id };

        axios
            .post(
                `${process.env.REACT_APP_API_URL}/new-comment`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                setTitle("");
                setDescription("");
                setAuthor("");
                return axios.put(`${process.env.REACT_APP_API_URL}/users/${cookId}/comments`, { comments: response.data._id }, { headers: { Authorization: `Bearer ${storedToken}` } })
            })
            .then(() => {
                navigate(`/cooks/${cookId}`)
            })
            .catch((error) => {
                setErrorMsg("oops, error posting a new comment");
                console.log(error)
            });
    };



    return (
        <Container>
            <h3 style={{ textTransform: 'uppercase', letterSpacing: '1.5px' }}>Add a comment</h3>

            {errorMsg &&
                <p style={{ marginTop: '3rem', backgroundColor: '#E8F2E8' }}>
                    {errorMsg}
                </p>
            }

            <Form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>

                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group style={{ marginTop: '1rem' }}>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        as="textarea"
                        placeholder="Your comment goes here"
                        style={{ height: '100px' }}>
                    </Form.Control>
                </Form.Group>

                <Button
                    type="submit"
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
        </Container>
    );
}

export default AddComment;