import { db } from "../index.js"
import { v4 as uuid } from "uuid";

export const registerPost = (req, res) => {
    const { username, password, firstName, lastName, emailAddress } = req.body;
    
    // Create a new user based on data received from req.body
    const newUser = {
        id: uuid(),
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        albums: []
    }

    // Add the new user object to db.data's "users" array
    db.data.users.push(newUser);

    // Update db.json
    db.write();

    // Send a response to the client containing the new user object in a JSON format
    res.status(201).json(newUser);
}