const express = require("express")
const blogController = require("../controllers/blogController")
const roleMiddleware = require("../roleMiddleware")

const router = express.Router()

router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(roleMiddleware(["admin"]),blogController.createBlog);

router
  .route('/:slug')
  .get(blogController.getBlog)
  .patch(roleMiddleware(["admin"]),blogController.updateBlog)
  .delete(roleMiddleware(["admin"]),blogController.deleteBlog);


module.exports = router