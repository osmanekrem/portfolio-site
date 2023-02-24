import React, { useEffect, useState } from 'react'
import "./styles.scss"

import { Link } from 'react-router-dom'
import axios from 'axios'

function Blogs() {
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
    <div className='blog-page'>
        <div className='top'>
            <Link to={"/"} className='back-arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' height="48" width="48"><path d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z"/></svg>
            </Link>
        </div>

    {blogs.length ? <div className='blog'>
        <div>
            <h1>Blogs</h1>
        </div>
        <div className='blog-content'>

        {blogs.map(blog => (
          <Link to={`/blog/${blog.slug}`} className='blog-post' key={blog._id}>
            <img src={blog.image} alt={blog.title} />
            <h3>{blog.title}</h3>
            <p>{blog.date.substr(0,10)}</p>
          </Link>
        ))}
        </div>
    </div>
    : <h1 className='no-blog'>No Blogs Yet</h1>}
    </div>
  )
}

export default Blogs