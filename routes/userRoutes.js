import express from "express";
import { createUser } from "../controllers/createUser.js";
import { readUsers } from "../controllers/readUser.js";
import { updateUser } from "../controllers/updateUser.js";
import { deleteUser } from "../controllers/deleteUser.js";

const router = express.Router();

router.post("/create-user", createUser);
router.get("/read-user", readUsers);
router.put("/update-user/:id", updateUser);
router.delete("/delete-user/:id", deleteUser);

export default router;
