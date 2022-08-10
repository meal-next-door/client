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
        <div>

            <div className="cover">
                <Image src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="cover" style={{ width: '100%', maxHeight: '60vh', backgroundSize: 'cover', backgroundPosition: 'center', objectFit: 'cover' }} />
            </div>

            <div className="about" style={{ marginTop: '4.5rem' }}>
                <Container>
                    <h3>How does it work?</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Container>
            </div>

            <div className="community" style={{ marginTop: '4.5rem' }}>
                <h3>Meet the community</h3>
                <Container>
                    <Row>
                        {users.length > 0 && cooks?.map((user) => {
                            return (
                                <Col md={6} lg={4}>
                                    <Card key={user._id} style={{ margin: '0.7rem' }}>
                                        <Card.Body>
                                            <Card.Img src={user.image} style={{ maxHeight: '10rem', objectFit: 'cover' }} />
                                            <Card.Title>{user?.username}</Card.Title>
                                            <p>{user?.role}</p>
                                            <p><strong>Location: </strong>{user?.address}</p>
                                            <NavLink to={`/cooks/${user._id}`}>
                                                <button style={{ backgroundColor: '#3E5D3E', color: '#fff', borderRadius: '15px', padding: '5px 20px' }}>Visit profile</button>
                                            </NavLink>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
            </div>

            <div className="meals" style={{ marginTop: '4.5rem' }}>
                <h3>Find your next meal</h3>
                <Container>
                    <Row>
                        {meals.length > 0 && recentMeals?.map((meal) => {
                            return (
                                <Col md={6} lg={4}>
                                    <Card key={meal._id} style={{ margin: '0.7rem' }}>
                                        <Card.Body>
                                            <Card.Img src={meal.image} style={{ maxHeight: '10rem', objectFit: 'cover' }} />
                                            <Card.Title style={{ margin: '1rem' }}>{meal?.title}</Card.Title>
                                            {meal.diet?.map(e => {
                                                return <span style={{ margin: '0.3rem', backgroundColor: '#E8F2E8', color: 'black', border: '0.03rem solid', borderColor: '#3E5D3E', borderRadius: '20px', padding: '5px 20px' }}>{e} </span>
                                            })}
                                            <p style={{ margin: '1rem' }}><strong>Cooked by: </strong>{meal.cook?.username}</p>
                                            <NavLink to={`/meals/${meal._id}`}>
                                                <button style={{ backgroundColor: '#3E5D3E', color: '#fff', borderRadius: '15px', padding: '5px 20px' }}>See details</button>
                                            </NavLink>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
            </div>
        </div>
    );
}


export default HomePage;
