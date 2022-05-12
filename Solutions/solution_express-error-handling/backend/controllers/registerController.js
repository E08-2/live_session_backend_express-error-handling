import { db } from "../index.js"
import { v4 as uuid } from "uuid";

export const registerPost = (req, res, next) => {
    const { username, password, firstName, lastName, emailAddress } = req.body;
    
    const foundUsername = db.data.users.find(user => user.username === username);

    // If there is no user in the db with the username received from the frontend
    if (!foundUsername) {
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
    
    // If there is already a user in the db with the username received from the frontend
    // Create an error object with a relevant message and statusCode, and pass it to the error handling middleware
    } else {
        const err = new Error();
        err.message = "Sorry, this username has been taken. Please choose another";
        err.statusCode = 409;   // Conflict
        next(err);
    }    
}