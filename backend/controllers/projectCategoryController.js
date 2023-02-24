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

exports.createProjectCategory = async (req, res) => {
    try {
        await ProjectCategory.create(req.body);
        res.status(201).json({"message":"successful"});
    } catch (error) {
        res.status(400).json({"message":"unsuccessful"});
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await ProjectCategory.findByIdAndRemove(req.params.id)
        res.status(200).json({ message: 'Kategori başarıyla silindi.' });
    } catch (error) {
        res.status(500).json({ error: 'Kategori silinirken bir hata oluştu.' });
    }
};