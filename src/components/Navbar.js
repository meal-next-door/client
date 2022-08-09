import { useContext } from "react";
import { AuthContext } from "../context/auth.context"
import { NavLink } from "react-router-dom";

function Navbar(props) {

    const { isLoggedIn, logOutUser } = useContext(AuthContext);
    const { user } = useContext(AuthContext);

    const refreshList = () => {
        props.refreshMeals();
    }

    return (
        <nav className="Navbar">
            <NavLink to="/">Home</NavLink> |
            <NavLink to="/cooks">Cooks</NavLink> |
            <NavLink to="/meals" onClick={() => refreshList()}>Meals</NavLink> |

            {user?.role === "cook" && (
                <>
                    <NavLink to="/create-meal">Create</NavLink> |
                </>
            )}

            {isLoggedIn && (
                <>
                    <NavLink to={`/profile/${user._id}`}>Profile</NavLink> |
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