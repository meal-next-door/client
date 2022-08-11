import { useContext } from "react";
import { AuthContext } from "../context/auth.context"
import { NavLink } from "react-router-dom";
import { Button, Container, Nav, Navbar, Image, NavDropdown } from "react-bootstrap";

function NavBar(props) {
    const { isLoggedIn, logOutUser } = useContext(AuthContext);
    const { user } = useContext(AuthContext);

    const refreshList = () => {
        props.refreshMeals();
    }


    return (
        < Navbar collapseOnSelect expand="lg"
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
                    <Image src="/Logo-rectangle.png" style={{ maxWidth: '70%' }} className="logo" />
                </NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="me-auto">
                        <NavLink to="/cooks" className="nav-bar">Cooks</NavLink>
                        <NavLink to="/meals" className="nav-bar" onClick={() => refreshList()}>Meals</NavLink>
                        {user?.role === "cook" && (
                            <>
                                <NavLink to="/create-meal" className="nav-bar">Create</NavLink>
                            </>
                        )}
                    </Nav>

                    <Nav style={{ display: 'flex', alignItems: 'center' }}>
                        {isLoggedIn && (
                            <>
                                <NavLink to={`/profile/${user._id}`} className="nav-bar">Profile</NavLink>
                                <Button onClick={logOutUser} variant="outline-light"
                                    style={{
                                        padding: '0.5rem 1.2rem',
                                        margin: '0 0.5rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        fontSize: '16px'
                                    }}>
                                    Logout
                                </Button>
                            </>
                        )}

                        {!isLoggedIn && (
                            <>
                                <NavLink to="/signup" className="nav-bar">Sign Up</NavLink>
                                <NavLink to="/login" className="nav-bar">Login</NavLink>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}


export default NavBar;