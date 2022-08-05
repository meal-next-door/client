import { useContext } from "react";
import { AuthContext } from "../context/auth.context"
import { NavLink } from "react-router-dom";

function Navbar() {

    const { isLoggedIn, logOutUser, user } = useContext(AuthContext);

    return (
        <nav className="Navbar">
            <NavLink to="/">Home</NavLink> |
            <NavLink to="/cooks">Cooks</NavLink> |
            <NavLink to="/meals">Meals</NavLink> |

            {user?.role === "cook" && (
                <>
                    <NavLink to="/create-meal">Create</NavLink> |
                </>
            )}

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