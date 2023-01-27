const mongoose = require("mongoose");

const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    github: {
        type: String
    },
    live: {
        type: String
    },
    image: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProjectCategory"
    }
})

const Project = mongoose.model("Project", ProjectSchema)
module.exports = Project