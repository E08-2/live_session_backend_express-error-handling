import { db } from "../index.js";

// POST "/users" controller function

export const usersPost = async (req, res, next) => {
    const { name, age } = req.body;

    // Try to find the new user in the database - do they already exist?
    // If "found" === undefined --> we didn't find an existing user with the same name and age
    // If "found" === an object --> we did find an existing user
    const found = db.data.users.find(user => user.name === name && user.age === age);

    // If there is no existing user with the same details...
    if (!found) {
        const newUser = {
            name: name,
            age: age,
            id: db.data.users.length + 1
        }

        // Update the "currentData" array with the new user
        db.data.users.push(newUser);

        await db.write();

        res.status(201).json(db.data.users) // Updated array, with the new user object inside it
    } else {
        // If we do find an existing user, we can't successfully process the request!
        // Create an error object, and pass it on to our error handler
        const err = new Error();
        err.message = "A user with these details already exists in the db!";
        err.statusCode = 409;   // 409 error = "Conflict"
        next(err);
    }
}

// DELETE "/users" controller function

export const usersDelete = async (req, res) => {
    // Remove the last item in the db.data.users array
    db.data.users.pop();  

    // Write this change to our database file
    await db.write();

    // Send a response with the latest version of the users array (minus the user we deleted!)
    res.json(db.data.users);
}