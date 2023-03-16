const express = require("express")
const projectController = require("../controllers/projectController")
const roleMiddleware = require("../roleMiddleware")

const router = express.Router()

router.route("/").get(projectController.getAllProjects)
router.route("/").post(roleMiddleware(["admin"]),projectController.createProject)
router.route("/:id").delete(projectController.DeleteProject)

module.exports = router