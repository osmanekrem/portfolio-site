import React from 'react'
import { Link } from 'react-router-dom'

const blogData = [
    {
      id: 1,
      title: 'Blog Post 1',
      date: '2020-01-01',
      img: 'https://via.placeholder.com/150',
      text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: 2,
      title: 'Blog Post 2',
      date: '2020-01-01',
      img: 'https://via.placeholder.com/150',
      text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: 3,
      title: 'Blog Post 3',
      date: '2020-01-01',
      img: 'https://via.placeholder.com/150',
      text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  ]

function Blog() {
  return (
    <div id='blog' className='blog'>
      <div className='blog-header'>
        <h2>Blog</h2>
        <Link to={'blog'}>See All Blogs</Link>
      </div>
      <div className='blog-content'>
        {blogData.map(blog => (
          <Link to={`blog/${blog.id}`} className='blog-post' key={blog.id}>
            <img src={blog.img} alt={blog.title} />
            <p>{blog.date}</p>
            <h3>{blog.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Blog