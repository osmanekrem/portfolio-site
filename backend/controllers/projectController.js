const Project = require("../models/projectModel")

exports.getAllProjects = async (req, res) => {
    try {
        const category_id = req.query.category_id;

        let filter = {}

        if(category_id){
            filter = {
                category_id: category_id
            }
        }
        const projects = await Project.find(filter);
        res.status(200).json({
            status: "success",
            projects
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        })
    }
}