import React, { useEffect, useState } from "react";
import Logout from "../components/Logout";

const Albums = props => {
    const [firstName, setFirstName] = useState("");
    const [band, setBand] = useState("");
    const [albumTitle, setAlbumTitle] = useState("");
    const [albumYear, setAlbumYear] = useState("");
    const [albums, setAlbums] = useState([]);

    // When the <Albums /> component first renders...
    // GET relevant data about the user who logged in, and update state...
    // So the user can see their name and current list of albums immediately after they log in/register
    useEffect(() => {
        const fetchUserData = async () => {
            // Make a GET request to the "/users/:id" endpoint in our server...
            // ... and then handle the response from the server
            const response = await fetch(`http://localhost:3001/users/${props.currentUserId}`);

            try {
                // If the request was successful...
                if (response.ok) {
                    const data = await response.json();
                    setFirstName(data.firstName);
                    setAlbums(data.albums);
                
                // If the request was unsuccessful...
                } else {
                    const errObj = await response.json();
                    throw new Error(errObj.message);
                }
            } catch (err) {
                alert(err.message);
            }
        }

        fetchUserData();
    }, [props.currentUserId])

    const updateData = event => {
        switch (event.target.name) {
            case "band":
                setBand(event.target.value);
                break;
            case "title":
                setAlbumTitle(event.target.value);
                break;
            case "year":
                setAlbumYear(event.target.value);
                break;
            default:
                break;
        }
    }

    // Make a POST request to the "/users/:id/albums" endpoint in our server...
    // ... and then handle the response from the server
    const submitAlbum = async event => {
        event.preventDefault();

        const newAlbum = {
            band: band,
            albumTitle: albumTitle,
            albumYear: albumYear
        }

        const settings = {
            method: "POST",
            body: JSON.stringify(newAlbum),
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(`http://localhost:3001/users/${props.currentUserId}/albums`, settings);

        try {
            // If the request was successful...
            if (response.ok) {
                const data = await response.json();
                setAlbums(data)
                setBand("");
                setAlbumTitle("");
                setAlbumYear("");

            // If the request was unsuccessful...
            } else {
                const errObj = await response.json()
                throw new Error(errObj.message);
            }
        } catch (err) {
            alert(err.message);
        }

    }

    // Make a DELETE request to the "/users/:id/albums" endpoint in our server...
    // ... and then handle the response from the server
    const deleteAllAlbums = async event => {
        const settings = {
            method: "DELETE"
        }

        const response = await fetch(`http://localhost:3001/users/${props.currentUserId}/albums`, settings);

        try {
            // If the request was successful...
            if (response.ok) {
                const data = await response.json();
                setAlbums(data);

            // If the request was unsuccessful...
            } else {
                const errObj = await response.json();
                throw new Error(errObj.message);
            }
        } catch (err) {
            alert(err.message);
            console.log(err.statusCode);
            console.log(err.message);
        }
    }

    return (
        <div>
            <h2 id="greeting">Welcome {firstName}!</h2>
            <Logout logout={props.logout} />
            <h1>Add an Album to the Collection!</h1>

            <form onSubmit={submitAlbum}>
                <div>
                    <label>Band</label>
                    <input name="band" onChange={updateData} value={band} />
                </div>
                <div>
                    <label>Title</label>
                    <input name="title" onChange={updateData} value={albumTitle} />
                </div>
                <div>
                    <label>Year</label>
                    <input name="year" onChange={updateData} value={albumYear} />
                </div>
                <button>Submit Album</button>
            </form>
            <button onClick={deleteAllAlbums}>Delete all albums!</button>

            <div>
                <h2>Current Albums</h2>
                <ul>
                    {
                        albums.map(album => {
                            return <li key={album.id}>{album.albumTitle} by {album.band} ({album.albumYear})</li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Albums;