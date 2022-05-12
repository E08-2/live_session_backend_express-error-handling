import express from "express";
import { getUserData, postAlbum, deleteAlbums } from "../controllers/usersController.js";

const router = express.Router();

// GET /user/1234
router.get("/:id", getUserData);   // GET relevant data about the user object and send it back in the response

// POST /user/1234/albums
router.post("/:id/albums", postAlbum);

// DELETE /user/1234/albums
router.delete("/:id/albums", deleteAlbums);

export default router;