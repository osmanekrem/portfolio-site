import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function Blog() {

  const [blogs, setBlogs] = useState([])

  const getBlogs = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_BASE_URL+'/blogs');
      setBlogs(response.data.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBlogs()
  },[])

  return (
    <div id='blog' className='blog'>
      <div className='blog-header'>
        <h2>Blog</h2>
        <Link to={'blog'}>See All Blogs</Link>
      </div>
      <div className='blog-content'>
        {blogs.map(blog => (
          <Link to={`blog/${blog.slug}`} className='blog-post' key={blog._id}>
            <img src={blog.image} alt={blog.title} />
            <h3>{blog.title}</h3>
            <p>{blog.date.substr(0,10)}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Blog