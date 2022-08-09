import { NavLink } from "react-router-dom";

function HomePage(props) {


    const users = props.users;
    const meals = props.meals;

    let cooks, recentMeals

    if (users.length > 0 && meals.length > 0) {
        const userCopy = [...users]
        const mealCopy = [...meals]
        cooks = userCopy?.filter(user => user.role === "cook").sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 1);
        recentMeals = mealCopy?.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 1);
    }


    return (
        <div>
            <div className="cover">
                <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="cover" />
            </div>
            <div>
                <h3>How does it work?</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div>
                <h3>Meet the community</h3>
                {users.length > 0 && cooks?.map((user) => {
                    return (
                        <div className="UserCard card" key={user._id} >
                            <h3>{user?.username}</h3>
                            <p>{user?.role}</p>
                            <NavLink to={`/cooks/${user._id}`}>
                                <button>Visit Profile</button>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
            <div>
                <h3>Find your next meal</h3>
                {meals.length > 0 && recentMeals?.map((meal) => {
                    return (
                        <div key={meal._id}>
                            <h3>{meal.title}</h3>
                            <p>{meal.date}</p>
                            <p>{meal.cook.username}</p>
                            <NavLink to={`/meals/${meal._id}`}>
                                <button>See details</button>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default HomePage;
