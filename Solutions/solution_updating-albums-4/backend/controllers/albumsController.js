import { db } from "../index.js";
import { v4 as uuid } from "uuid";

// GET /albums

export const albumsGet = (req, res) => {
    res.json(db.data.albums);
}

// POST /albums

export const albumsPost = async (req, res) => {
    const { band, albumTitle, albumYear } = req.body;

    // Here we can use .find() to check if the new album already exists in our db.data
    // Two options:
    //  - If we find an album in our data with the same band, title and year as the album sent from the frontend, "found" will return the album that was found
    //  - If we find NO album with the same band, title and year as the album sent from the frontend, "found" will return "undefined"
    const found = db.data.albums.find(album => album.band === band && album.albumTitle === albumTitle && album.albumYear === albumYear)

    // "If we DIDN'T find a matching album in our data"
    // Create the new album object, give it an id, add it to our db, and send a response with the updated album list
    if (!found) {
        const newAlbum = {
            id: uuid(),
            band: band,
            albumTitle: albumTitle,
            albumYear: albumYear
        }

        db.data.albums.push(newAlbum);

        await db.write();

        console.log(`New album added to the albums array with id ${newAlbum.id}`);

        res.status(201).json(db.data.albums);
    } else {
        // Else, if we DID find a matching album...
        // Don't do anything - just respond with the list of albums unchanged
        res.json(db.data.albums);
    }
}

// DELETE /albums

export const albumsDelete = async (req, res) => {
    // Reset db.data.albums to an empty array
    db.data.albums = [];

    // Update the db.json file
    await db.write();

    // Send the new, empty array in your response to the frontend
    res.json(db.data.albums);
}