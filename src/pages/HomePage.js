import { NavLink } from "react-router-dom";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";

function HomePage(props) {

    const users = props.users;
    const meals = props.meals;

    let cooks, recentMeals

    if (users.length > 0 && meals.length > 0) {
        const userCopy = [...users]
        const mealCopy = [...meals]
        cooks = userCopy?.filter(user => user.role === "cook").sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 3);
        recentMeals = mealCopy?.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 3);
    }

    return (
        <>
            <Image src="/cover-picture.jpg" alt="cover" className="disable"
                style={{
                    width: '100%',
                    maxHeight: '60vh',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    objectFit: 'cover'
                }} />

            <Container className="about" style={{ marginTop: '4.5rem' }}>
                <h3
                    style={{
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        fontSize: '28px'
                    }}>
                    About us
                </h3>
                <p>You are hungry ? <br></br>
                    You don't want to cook ?<br></br>
                    You are tired of Deliveroo and co ?<br></br>
                    Try our app !<br></br>
                    Browse through our list of awesome cooks, and their delicious meals and find your ideal menu.
                </p>
            </Container>

            <Container className="community" style={{ marginTop: '5rem' }}>
                <h3
                    style={{
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        fontSize: '28px'
                    }}>
                    Meet the community
                </h3>

                <Row>
                    {users.length > 0 && cooks?.map((user) => {
                        return (
                            <Col md={6} lg={4}>
                                <Card className="Card" key={user._id} style={{ margin: '0.7rem' }} >
                                    <Card.Body>
                                        <NavLink to={`/cooks/${user._id}`}>
                                            <Card.Img src={user.image} style={{ maxHeight: '10rem', objectFit: 'cover' }} />
                                        </NavLink>
                                        <Card.Title style={{ margin: '1rem' }}>{user?.username}</Card.Title>
                                        <p>{user?.role}</p>
                                        <p><strong>Location: </strong>{user?.address}</p>
                                        <NavLink to={`/cooks/${user._id}`}>
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
                            </Col>
                        )
                    })}
                </Row>
            </Container>

            <Container className="meals" style={{ marginTop: '7rem' }}>
                <h3
                    style={{
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        fontSize: '28px'
                    }}>
                    Find your meal
                </h3>
                <Row>
                    {meals.length > 0 && recentMeals?.map((meal) => {
                        return (
                            <Col md={6} lg={4}>
                                <Card className="Card" key={meal._id} style={{ margin: '0.7rem' }}>
                                    <Card.Body>
                                        <NavLink to={`/meals/${meal._id}`}>
                                            <Card.Img src={meal.image} style={{ maxHeight: '10rem', objectFit: 'cover' }} />
                                        </NavLink>
                                        <Card.Title style={{ margin: '1rem' }}>{meal?.title}</Card.Title>

                                        {meal.diet?.map(e => {
                                            return (
                                                <span
                                                    style={{
                                                        margin: '0.3rem',
                                                        backgroundColor: '#E8F2E8',
                                                        color: 'black',
                                                        border: '0.03rem solid',
                                                        borderColor: '#3E5D3E',
                                                        borderRadius: '20px',
                                                        padding: '5px 20px'
                                                    }}>
                                                    {e}
                                                </span>
                                            )
                                        })}

                                        <p style={{ margin: '1rem' }}><strong>Cooked by: </strong>{meal.cook?.username}</p>

                                        <NavLink to={`/meals/${meal._id}`}>
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
                                                See details
                                            </Button>
                                        </NavLink>

                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>

        </>
    );
}


export default HomePage;
