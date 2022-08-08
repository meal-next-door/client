import { NavLink } from "react-router-dom";


function CooksList(props) {
    const users = props.users;

    const cooks = [...users].filter(user => user.role === "cook")

    return (
        <div className="CooksList">

            {cooks?.map((cook) => {
                return (
                    cook.role === 'cook'
                        ? <div className="cooks card" key={cook._id} >
                            <h3>{cook.username}</h3>
                            <p>{cook.address}</p>
                            <NavLink to={`/cooks/${cook._id}`}>
                                <button>Visit Profile</button>
                            </NavLink>
                        </div>
                        : <p> </p>
                );
            })}

        </div>
    );
}

export default CooksList;