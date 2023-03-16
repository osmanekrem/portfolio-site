const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectCategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        requireD: true,
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Project"
    }]
});

const ProjectCategory = mongoose.model("ProjectCategory", ProjectCategorySchema );
module.exports = ProjectCategory;
