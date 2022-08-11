import { useContext } from "react";
import { AuthContext } from "../context/auth.context"
import { NavLink } from "react-router-dom";
import { Button, Container, Nav, Navbar, Image } from "react-bootstrap";

function NavBar(props) {
    const { isLoggedIn, logOutUser } = useContext(AuthContext);
    const { user } = useContext(AuthContext);

    const refreshList = () => {
        props.refreshMeals();
    }


    return (
        <Navbar
            sticky="top"
            expand="lg"
            collapseOnSelect
            style={{
                backgroundColor: '#3E5D3E',
                margin: '0',
                display: "flex",
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontSize: '16px',
            }}>

            <Container style={{ margin: '0', maxWidth: '100vw' }}>

                <NavLink to="/">
                    <Image src="/Logo-rectangle.png" style={{ maxWidth: '70%' }} />
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse style={{ display: 'flex', justifyContent: 'space-between', display: "flex", width: '100%' }}>

                    <Nav>
                        <NavLink
                            to="/cooks"
                            style={{
                                color: '#FFFFFF',
                                textDecoration: 'none',
                                padding: '0 1rem'
                            }}>
                            Cooks
                        </NavLink>
                        <NavLink
                            to="/meals"
                            onClick={() => refreshList()}
                            style={{
                                color: '#FFFFFF',
                                textDecoration: 'none',
                                padding: '0 1rem'
                            }}>
                            Meals
                        </NavLink>

                        {user?.role === "cook" && (
                            <>
                                <NavLink
                                    to="/create-meal"
                                    style={{
                                        color: '#FFFFFF',
                                        textDecoration: 'none',
                                        padding: '0 1rem'
                                    }}>
                                    Create
                                </NavLink>
                            </>
                        )}
                    </Nav>

                    <Nav style={{ display: 'flex', alignItems: 'center', padding: '0 3em' }}>
                        {isLoggedIn && (
                            <>
                                <NavLink
                                    to={`/profile/${user._id}`}
                                    style={{
                                        color: '#FFFFFF',
                                        textDecoration: 'none',
                                        padding: '0 1rem'
                                    }}>
                                    Profile
                                </NavLink>
                                <Button
                                    onClick={logOutUser}
                                    variant="outline-light"
                                    style={{
                                        padding: '0.5rem 1.2rem',
                                        margin: '0 0.5rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        fontSize: '16px',
                                    }}>
                                    Logout
                                </Button>
                            </>
                        )}

                        {!isLoggedIn && (
                            <>
                                <NavLink
                                    to="/signup"
                                    style={{
                                        color: '#FFFFFF',
                                        padding: '0 1rem'
                                    }}>
                                    Sign Up
                                </NavLink>
                                <NavLink
                                    to="/login"
                                    style={{
                                        color: '#FFFFFF',
                                        textDecoration: 'none',
                                        padding: '0 1rem'
                                    }}>
                                    Login
                                </NavLink>
                            </>
                        )}
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default NavBar;