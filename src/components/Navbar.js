import { useContext } from "react";
import { AuthContext } from "../context/auth.context"
import { NavLink } from "react-router-dom";
import { Button, Container, Nav, Navbar, NavbarBrand, Row, Col } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";

function NavBar(props) {

    const { isLoggedIn, logOutUser } = useContext(AuthContext);
    const { user } = useContext(AuthContext);

    const refreshList = () => {
        props.refreshMeals();
    }

    return (
        <Navbar sticky="top" expand="lg" collapseOnSelect style={{ backgroundColor: '#3E5D3E', margin: '0' }}>
            <Container style={{ margin: '0' }}>
                <NavLink to="/">
                <img src="/Logo-rectangle.png"/>
                </NavLink>
                <NavbarToggle aria-controls="basic-navbar-nav" />
                <NavbarCollapse id="basic-navbar-nav" style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Nav>
                        <Row>
                            <Col>
                                <NavLink to="/cooks" style={{ color: '#FFFFFF', textDecoration: 'none' }}>Cooks</NavLink> |
                                <NavLink to="/meals" onClick={() => refreshList()} style={{ color: '#FFFFFF', textDecoration: 'none' }}>Meals</NavLink> |

                                {user?.role === "cook" && (
                                    <>
                                        <NavLink to="/create-meal" style={{ color: '#FFFFFF', textDecoration: 'none' }}>Create</NavLink> |
                                    </>
                                )}

                            </Col>

                            <Col>
                                {isLoggedIn && (
                                    <>
                                        <NavLink to={`/profile/${user._id}`} style={{ color: '#FFFFFF', textDecoration: 'none' }}>Profile</NavLink>
                                        <Button onClick={logOutUser} variant="outline-light" style={{ borderRadius: '20%' }}>Logout</Button>
                                    </>
                                )}

                                {!isLoggedIn && (
                                    <>
                                        <NavLink to="/signup" style={{ color: '#FFFFFF' }}>Sign Up</NavLink> |
                                        <NavLink to="/login" style={{ color: '#FFFFFF', textDecoration: 'none' }}>Login</NavLink>
                                    </>
                                )}
                            </Col>
                        </Row>
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    );
}


export default NavBar;