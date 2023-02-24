const express = require("express")
const projectCategoryController = require("../controllers/projectCategoryController")
const roleMiddleware = require("../roleMiddleware")

const router = express.Router()

router.route("/").get(projectCategoryController.getAllCategories)
router.route("/").post(roleMiddleware(["admin"]),projectCategoryController.createProjectCategory)
router.route("/:id").delete(roleMiddleware(["admin"]),projectCategoryController.deleteCategory)


module.exports = router