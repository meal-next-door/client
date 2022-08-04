import { useState, useEffect } from "react";
import axios from "axios";


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
                            {cooks.favorite
                                ? cooks.favorites.map((favorite) => {
                                    return (
                                        <p>{cook.favorites}</p>
                                    )
                                })
                                : <p>No Favorites yet</p>
                            }
                            {
                                cooks.comment
                                    ? cooks.comments.map((favorite) => {
                                        return (
                                            <p>{cook.comments}</p>
                                        )
                                    })
                                    : <p>No comments yet</p>
                            }
                    </div>
                    : <p> </p>
                );
            })}

        </div>
    );
}

export default CooksList;