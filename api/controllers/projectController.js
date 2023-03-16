const Project = require("../models/projectModel")
const fs = require("fs")

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
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
exports.DeleteProject = async (req, res) => {
    try {
      const item = await Project.findByIdAndRemove(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Öğe bulunamadı' });
      }
      res.json({ message: 'Öğe başarıyla silindi' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Bir hata oluştu' });
    }
  }

exports.createProject = async (req, res) => {
    try {
        const uploadDir = 'public/uploads';

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        let uploadedImage = req.files.image;
        let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;
        uploadedImage.mv(uploadPath, async () => {

            const project = await Project.create({
                ...req.body,
                categories:req.body.categories.split(",") ,
                image:'https://oeapi.onrender.com/uploads/' + uploadedImage.name
            });
            res.status(201).json({
                status: "success",
                project
            })
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
        })
    }
};