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
        < Navbar collapseOnSelect expand="lg" sticky="top" className="nav-wrapper">
            <Container style={{ margin: '0', maxWidth: '100vw' }}>
                <NavLink to="/">
                    <Image src="/Logo-rectangle.png" className="logo" />
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
                                <NavLink to="/login">
                                    <Button onClick={logOutUser} variant="outline-light" className="logout">Logout</Button>
                                </NavLink>
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