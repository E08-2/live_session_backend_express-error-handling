import express from "express";
import cors from "cors";
import { Low, JSONFile } from "lowdb";
import albumsRouter from "./routes/albums.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";
// ! No longer used
// import logger from "./middleware/logger.js";
import morgan from "morgan";

const app = express();

const adapter = new JSONFile("./data/db.json");
export const db = new Low(adapter);

// Get a copy of the current data from the "data/db.json" file.
await db.read();

// This allows ALL cors requests to all our routes
app.use(cors());

// We can use express's .json() method to parse JSON data received in any request
app.use(express.json());

// Register our "logger" middleware
// ALL requests will go through this middleware
// ! No longer used - now we are using "morgan" for logging
// app.use(logger);

// Use morgan to make a small log every time a request is received
app.use(morgan("tiny"));

app.use("/albums", albumsRouter);

app.use("/register", registerRouter);

app.use("/login", loginRouter);

app.use("/users", usersRouter);

app.listen(3001, () => {
    console.log("Server has started on port 3001!");
})