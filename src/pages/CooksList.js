import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";


function CooksList(props) {
    const users = props.users;
    const cooks = [...users].filter(user => user.role === "cook")


    return (
        <div className="CooksList">

            <h2
                style={{
                    marginTop: '3rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    fontSize: '24px'
                }}>
                Meet our community of cooks
            </h2>

            <Container style={{ marginTop: '3rem' }}>
                <Row>
                    {cooks?.map((cook) => {
                        return (
                            <Col md={6} lg={4}>

                                {cook.role === 'cook'
                                    ? <Card className="Card" key={cook._id} style={{ margin: '0.7rem' }}>
                                        <Card.Body>
                                            <Card.Img src={cook.image} style={{ maxHeight: '10rem', objectFit: 'cover' }} />
                                            <Card.Title style={{ margin: '1rem' }}>{cook.username}</Card.Title>
                                            <p><strong>Location: </strong>{cook.address}</p>
                                            <NavLink to={`/cooks/${cook._id}`}>
                                                <Button
                                                    style={{
                                                        backgroundColor: '#3E5D3E',
                                                        color: '#fff',
                                                        border: 'none',
                                                        padding: '5px 20px',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '2px',
                                                        fontSize: '14px'
                                                    }}>
                                                    Visit profile
                                                </Button>
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