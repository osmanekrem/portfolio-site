const Blog = require('../models/blogModel');
const fs = require("fs")

// Tüm blogları getirir
module.exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

module.exports.getBlog = async (req, res) => {
    try {
      const blog = await Blog.findOne({slug: req.params.slug});
      res.status(200).json({ success: true, data: blog });
    } catch (err) {
      res.status(404).json({ success: false, error:err.message });
    }
  };

// Yeni bir blog oluşturur
module.exports.createBlog = async (req, res) => {
  try {
    const uploadDir = 'public/uploads';

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let uploadedImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;
    uploadedImage.mv(uploadPath, async () => {
        const blog = await Blog.create({
          ...req.body,
          image:'https://oeapi.onrender.com/uploads/' + uploadedImage.name
        });
        res.status(201).json({ success: true, data: blog });
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Bir blogu günceller
module.exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Bir blogu siler
module.exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({slug: req.params.slug});
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
