import { useContext } from "react";
import { AuthContext } from "../context/auth.context"
import { NavLink } from "react-router-dom";

function Navbar() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <nav className="Navbar">
            <NavLink to="/">Home</NavLink> |
            <NavLink to="/projects">Projects</NavLink> |
            {isLoggedIn && (
                <>
                    <button onClick={logOutUser}>Logout</button>
                </>
            )}

            {!isLoggedIn && (
                <>
                    <NavLink to="/signup">Sign Up</NavLink> |
                    <NavLink to="/login">Login</NavLink>
                </>
            )}


        </nav>
    );
}


export default Navbar;