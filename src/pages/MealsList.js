import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context"
import { useState } from "react";
import { Container, Row, Col, Card, Form, FormLabel, FormControl, Button } from "react-bootstrap";

function MealsList(props) {

    const { user } = useContext(AuthContext);
    const [search, setSearch] = useState("");

    // Functionality to SEARCH WITH A SEARCH BAR
    const handleSearch = (event) => {
        setSearch(event)

        props.setMeals(() => {
            const filterResult = props.mealsCopy.filter(e => {
                return e.title.toLowerCase().includes(event.toLowerCase())
            })
            return filterResult;
        })
    }


    // Functionality to SEARCH BY DIET
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
                    <Button style={{ margin: '3rem', backgroundColor: '#3E5D3E', border: 'none' }}>Add your own meal</Button>
                </NavLink>

                : <p> </p>
            }

            <Container>
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
            <Button onClick={() => handleDiet('halal')} style={{ margin: '0.5rem', backgroundColor: '#E8F2E8', color: 'black', border: 'none', borderRadius: '20px' }}>Halal</Button>
            <Button onClick={() => refreshList()} style={{ margin: '0.5rem', backgroundColor: '#E8F2E8', color: 'black', borderColor: '#3E5D3E', borderRadius: '20px' }}>Refresh</Button>

            <Container style={{ marginTop: '3rem' }}>
                <Row>

                    {props.meals?.map((meal) => {
                        return (

                            <Col md={6} lg={4}>
                                <Card key={meal._id} style={{ margin: '0.7rem' }} >
                                    <Card.Body>
                                        <Card.Img src={meal.image} style={{ maxHeight: '10rem' }} />
                                        <Card.Title>{meal.title}</Card.Title>
                                        {meal.diet?.map(e => {
                                            return <span>{e} </span>
                                        })}
                                        <p><strong>Cooked by:</strong> {meal.cook?.username}</p>
                                        <p>{meal.description}</p>

                                        <NavLink to={`/meals/${meal._id}`}>
                                            <button>View details</button>
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