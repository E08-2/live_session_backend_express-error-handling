import { db } from "../index.js";
import { v4 as uuid } from "uuid";

// GET user data
export const getUserData = (req, res) => {
    // Find the user in the db with the same id as the :id parameter in ("/users/:id/albums")

    // route = "/users/:id/albums"
    // ? So for a user with id "1234"...
    // The request will be sent to:
    // * "http://localhost:3001/users/1234/albums"
    // So below, userId = "1234"
    const userId = req.params.id;

    // Find the user in the "users" array with the correct id
    // When you find the user object with the correct id, we make a copy and put it in the "foundUser" variable
    const foundUser = db.data.users.find(user => user.id === userId);

    // When the user is found, send in the response back to the frontend:
    //  - firstName
    //  - list of albums

    const userData = {
        firstName: foundUser.firstName,
        albums: foundUser.albums
    }

    res.json(userData);
}

// POST a new album to the logged in user's "albums" list
export const postAlbum = async (req, res) => {
    const { band, albumTitle, albumYear } = req.body;

    const newAlbum = {
        id: uuid(),
        band: band,
        albumTitle: albumTitle,
        albumYear: albumYear
    }

    const userId = req.params.id;
    
    const indexOfUser = db.data.users.findIndex(user => user.id === userId);

    db.data.users[indexOfUser].albums.push(newAlbum);

    await db.write();

    res.json(db.data.users[indexOfUser].albums);
}

// DELETE all albums from the logged in user's "albums" list
export const deleteAlbums = async (req, res) => {
    const userId = req.params.id;
    
    const indexOfUser = db.data.users.findIndex(user => user.id === userId);

    db.data.users[indexOfUser].albums = [];
    
    await db.write();

    res.json(db.data.users[indexOfUser].albums);
}