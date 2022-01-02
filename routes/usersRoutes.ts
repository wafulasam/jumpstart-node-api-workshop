// users routes
import express from "express";
const router = express.Router();
const usersControllers = require("../controllers/usersControllers"); // import controllers

router.post("/users", usersControllers.addNewUser);
router.get("/users", usersControllers.getAllUsers);
router.get("/users/:id", usersControllers.getUserByID);
router.put("/users/:id", usersControllers.updateUserByID);
router.delete("/users/:id", usersControllers.deleteUserByID);

module.exports = router;