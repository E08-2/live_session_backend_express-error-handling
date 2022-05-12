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
        fetch(`http://localhost:3001/users/${props.currentUserId}`)
        .then(response => response.json())
        .then(data => {
            setFirstName(data.firstName);
            setAlbums(data.albums);
        })
    }, [props.currentUserId])

    const updateData = event => {
        switch(event.target.name) {
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

    const submitAlbum = event => {
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

        fetch(`http://localhost:3001/users/${props.currentUserId}/albums`, settings)
        .then(response => response.json())
        .then(data => {
            setAlbums(data)
            setBand("");
            setAlbumTitle("");
            setAlbumYear("");
        });
    }

    const deleteAllAlbums = event => {
        const settings = {
            method: "DELETE"
        }

        fetch(`http://localhost:3001/users/${props.currentUserId}/albums`, settings)
        .then(response => response.json())
        .then(data => setAlbums(data));
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