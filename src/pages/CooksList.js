import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";


function CooksList() {
    const [cooks, setCooks] = useState([]);

    const getAllCooks = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/users`)
            .then((response) => setCooks(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllCooks();
    }, []);

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