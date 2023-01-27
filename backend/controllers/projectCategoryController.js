const ProjectCategory = require("../models/projectCategoryModel")

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await ProjectCategory.find()
        res.status(200).json({
            status: "success",
            categories
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        })
    }
}