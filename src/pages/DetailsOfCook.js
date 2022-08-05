import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


function CookDetailsPage(props) {
    const [cook, setCook] = useState(null);

    const { cookId } = useParams();

    const getCook = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/users/${cookId}`)
            .then((response) => {
                setCook(response.data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getCook();
    }, []);


    return (
        <div className="CookDetails">

            {cook && (
                <>
                    <h1>{cook.username}</h1>
                    <p>{cook.address}</p>
                </>
            )}

            {cook &&
                cook.comments?.map((comment) => (
                    <li className="CookCard card" key={comment._id}>
                        <h3>{comment.title}</h3>
                        <h4>Description:</h4>
                        <p>{comment.description}</p>
                        <p>{comment.author}</p>
                    </li>
                ))}

            <Link to="/cooks">
                <button>Back to the list of cooks</button>
            </Link>
        </div>
    );
}

export default CookDetailsPage;