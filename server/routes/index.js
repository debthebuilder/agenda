const express = require("express");
const controllers = require("../controllers/tasks");
const router = express.Router();

router.route("/").get(controllers.getAllTasks).post(controllers.addTask);
