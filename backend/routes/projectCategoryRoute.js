const express = require("express")
const projectCategoryController = require("../controllers/projectCategoryController")

const router = express.Router()

router.route("/").get(projectCategoryController.getAllCategories)

module.exports = router