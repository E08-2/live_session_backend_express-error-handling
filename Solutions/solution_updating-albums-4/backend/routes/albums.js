import express from "express";
import { albumsGet, albumsPost, albumsDelete } from "../controllers/albumsController.js";

const router = express.Router();

// Create an "/albums" route serving GET requests
// This will send a response containing the current array of album objects, in JSON format 
router.get("/", albumsGet);

// Create an "/albums" route serving POST requests
// This should receive data in the format { "band": "x", "albumTitle": "y", "albumYear": "z" }
router.post("/", albumsPost);

// Create an "/albums" route serving DELETE requests
router.delete("/", albumsDelete);

export default router;