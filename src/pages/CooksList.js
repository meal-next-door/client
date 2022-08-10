import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";


function CooksList(props) {
    const users = props.users;

    // Functionality to READ one type of users
    const cooks = [...users].filter(user => user.role === "cook")


    return (
        <div className="CooksList">
            <h2 style={{ marginTop: '3rem' }}>Meet our community of cooks</h2>

            <Container style={{ marginTop: '3rem' }}>
                <Row>
                    {cooks?.map((cook) => {
                        return (
                            <Col md={6} lg={4}>
                                {cook.role === 'cook'
                                    ? <Card key={cook._id} style={{ margin: '0.7rem' }}>
                                        <Card.Body>
                                            <Card.Img src={cook.image} style={{ maxHeight: '10rem', objectFit: 'cover' }} />
                                            <Card.Title style={{ margin: '1rem' }}>{cook.username}</Card.Title>
                                            <p><strong>Location: </strong>{cook.address}</p>
                                            <NavLink to={`/cooks/${cook._id}`}>
                                                <button style={{ backgroundColor: '#3E5D3E', color: '#fff', borderRadius: '15px', padding: '5px 20px' }}>Visit Profile</button>
                                            </NavLink>
                                        </Card.Body>
                                    </Card>
                                    : <p> </p>}
                            </Col>
                        );
                    })}
                </Row>
            </Container>

        </div>
    );
}

export default CooksList;