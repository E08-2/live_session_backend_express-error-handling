// * In this live coding, we will create an Express ROUTER to handle:
// * POST and DELETE requests...
// * To the "/users" endpoint
// * This will also have the benefit of making index.js much smaller (more understandable!)
// * (We can import and export when we need to use functionality in other modules...)

// =============================

import express from "express";
import cors from "cors";

// Import lowdb
// You can use lowdb in your server to read data from, and write data to, the "data/db.json" file.
import { Low, JSONFile } from "lowdb";
// Import the router handling all requests to "/users"
import usersRouter from "./routes/users.js";
import basicLogger from "./middleware/basicLogger.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";

// lowdb uses adapters for reading from, and writing to, JSON files
// "An adapter is a simple class that just needs to expose two methods: read and write"
const adapter = new JSONFile("./data-folder/db.json");
export const db = new Low(adapter);

// ? "What is inside db.json?"
await db.read();

// Note: db.data now has a copy of all the data stored in "data/db.json"
console.log("!", db.data);

const app = express();

app.use(express.json());

app.use(cors());

// "Logging" middleware
// app.use means ALL requests will go through this middleware
app.use(basicLogger);

// If we receive ANY request to the "/users" endpoint, forward that request to the "users" router
app.use("/users", usersRouter);

// * Error handling middleware
// The last registered middleware should ALWAYS be the global error handler
// ? When one of the previous middlewares has an error, it can create an Error and call next()..
// ? By doing this, is can pass the Error directly to the error handling middleware for processing
// ? The error handling middleware will send an error response to the frontend
// Note that the error handling middleware has a 4th parameter - the error object to be handled by the middleware
app.use(globalErrorHandler);

app.listen(3001, () => {
    console.log("Server listening for requests on port 3001...")
})