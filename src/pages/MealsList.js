import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context"
import { useState } from "react";
import { Container, Row, Col, Card, Form, FormLabel, FormControl, Button } from "react-bootstrap";

function MealsList(props) {
    const { user } = useContext(AuthContext);
    const [search, setSearch] = useState("");


    // SEARCH BAR
    const handleSearch = (event) => {
        setSearch(event)

        props.setMeals(() => {
            const filterResult = props.mealsCopy.filter(e => {
                return e.title.toLowerCase().includes(event.toLowerCase())
            })
            return filterResult;
        })
    }


    // SEARCH BY DIET
    const handleDiet = (dietInput) => {

        props.setMeals(() => {
            const result = props.mealsCopy?.filter(e => {
                return e.diet.includes(dietInput);
            })
            return result;
        })
    }

    const refreshList = () => {
        props.refreshMeals();
    }


    return (
        <div className="MealsList">

            {user?.role === "cook"
                ? <NavLink to="/create-meal">
                    <Button
                        style={{
                            margin: '5rem 0 3rem',
                            backgroundColor: '#3E5D3E',
                            border: 'none',
                            color: '#fff',
                            padding: '10px 20px',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            fontSize: '14px'
                        }}>
                        Add your own meal
                    </Button>
                </NavLink>
                : <p> </p>
            }

            <Container className="search-bar">
                <Form style={{ margin: '3rem', textAlign: 'left' }}>
                    <Form.Group>
                        <FormLabel style={{ fontSize: '1.5rem' }}>Search</FormLabel>
                        <FormControl type="text" value={search} onChange={(e) => handleSearch(e.target.value)} ></FormControl>
                    </Form.Group>
                </Form>
            </Container>


            <Button onClick={() => handleDiet('vegetarian')} style={{ margin: '0.5rem', backgroundColor: '#E8F2E8', color: 'black', border: 'none', borderRadius: '20px' }}>Vegetarian</Button>
            <Button onClick={() => handleDiet('vegan')} style={{ margin: '0.5rem', backgroundColor: '#E8F2E8', color: 'black', border: 'none', borderRadius: '20px' }}>Vegan</Button>
            <Button onClick={() => handleDiet('gluten-free')} style={{ margin: '0.5rem', backgroundColor: '#E8F2E8', color: 'black', border: 'none', borderRadius: '20px' }}>Gluten-free</Button>
            <Button onClick={() => handleDiet('dairy-free')} style={{ margin: '0.5rem', backgroundColor: '#E8F2E8', color: 'black', border: 'none', borderRadius: '20px' }}>Dairy-free</Button>
            <Button onClick={() => handleDiet('allergens-free')} style={{ margin: '0.5rem', backgroundColor: '#E8F2E8', color: 'black', border: 'none', borderRadius: '20px' }}>Allergens-free</Button>
            <Button onClick={() => handleDiet('sugar-free')} style={{ margin: '0.5rem', backgroundColor: '#E8F2E8', color: 'black', border: 'none', borderRadius: '20px' }}>Sugar-free</Button>
            <Button onClick={() => handleDiet('kosher')} style={{ margin: '0.5rem', backgroundColor: '#E8F2E8', color: 'black', border: 'none', borderRadius: '20px' }}>Kosher</Button>
            <Button onClick={() => handleDiet('halal')} style={{ margin: '0.5rem', backgroundColor: '#E8F2E8', color: 'black', border: 'none', borderRadius: '20px', padding: '5px 18px' }}>Halal</Button>
            <Button onClick={() => refreshList()} style={{ margin: '0.5rem', backgroundColor: '#E8F2E8', color: 'black', borderColor: '#3E5D3E', borderRadius: '20px', padding: '5px 20px' }}>All</Button>

            <Container style={{ marginTop: '3rem' }}>
                <Row>
                    {props.meals?.map((meal) => {
                        return (
                            <Col md={6} lg={4}>
                                <Card className="Card" key={meal._id} style={{ margin: '0.7rem' }} >
                                    <Card.Body>
                                        <Card.Img src={meal.image} style={{ maxHeight: '10rem', objectFit: 'cover' }} />
                                        <Card.Title style={{ margin: '1rem' }}>{meal.title}</Card.Title>

                                        {meal.diet?.map(e => {
                                            return <span style={{ margin: '0.3rem', backgroundColor: '#E8F2E8', color: 'black', border: '0.03rem solid', borderColor: '#3E5D3E', borderRadius: '20px', padding: '5px 20px' }}>{e} </span>
                                        })}

                                        <p style={{ margin: '1rem' }}><strong>Cooked by:</strong> {meal.cook?.username}</p>

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
                                                View details
                                            </Button>
                                        </NavLink>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>

        </div>
    );
}


export default MealsList;