const mongoose = require('mongoose');
const slugify = require("slugify")

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  slug: String,
});

blogSchema.pre('save', function(next) {
  this.slug = slugify(this.title, {
    lower: true, // küçük harfe çevir
    remove: /[*+~.()'"!:@]/g, // slug içinde kullanılamayacak karakterleri sil
  });
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;