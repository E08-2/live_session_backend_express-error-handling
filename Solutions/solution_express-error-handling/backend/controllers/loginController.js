import { db } from "../index.js";

export const loginPost = (req, res, next) => {
    // Take the username and password the user tried to log in with
    const { username, password } = req.body;

    // Search inside the current list of users
    // Do any users have the SAME username AND password?
    const found = db.data.users.find(user => user.username === username && user.password === password);

    // If we found a user in our db with the same login details as we received from the frontend...
    // Send that user's id back the frontend in the response for further processing
    if (found) {
        const userId = {
            id: found.id
        };

        res.json(userId);
    // If we found no user in our db with the same login details as we received from the frontend
    // (E.g. the person logging in made a mistake with their username/password/both!)
    // Create an error object with a relevant message and statusCode, and pass it to the error handling middleware
    } else {
        const err = new Error();
        err.message = "You could not be logged in. Please try again"
        err.statusCode = 401;   // "Unauthorized"
        console.log("!!", err)
        next(err);
    }
}