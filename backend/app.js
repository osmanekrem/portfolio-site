const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const fileUpload = require("express-fileupload")
const projectRoute = require("./routes/projectRoute")
const projectCategoryRoute = require("./routes/projectCategoryRoute")
const userRoute = require("./routes/userRoute")
const blogRoute = require("./routes/blogRoute")

const app = express();

mongoose
    .connect("mongodb://0.0.0.0/portfolio-site")
    .then(() => console.log("DB connected"))
    .catch(() => console.log("DB not Connnected"));

app.use(cors())
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(methodOverride('_method'));

app.use("/projects", projectRoute)
app.use("/categories", projectCategoryRoute)
app.use("/user", userRoute)
app.use("/blogs", blogRoute)

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
