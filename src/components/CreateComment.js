import { useState } from "react";
import axios from "axios";

function AddComment(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const storedToken = localStorage.getItem("authToken");

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrorMsg("");

        const requestBody = { title, description, author };

        axios
            .post(
                `${process.env.REACT_APP_API_URL}/new-comment`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                props.refreshComments();
                setTitle("");
                setDescription("");
                setAuthor("");
            })
            .catch((error) => {
                setErrorMsg("oops, error posting a new comment");
                console.log(error)
            });
    };


    return (
        <div className="AddComment">
            <h3>Add Comment</h3>

            {errorMsg &&
                <p className="error">
                    {errorMsg}
                </p>
            }

            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Author:</label>
                <input
                    type="text"
                    name="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddComment;