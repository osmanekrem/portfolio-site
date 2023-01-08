import React from 'react'
import "./styles.scss"

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

function index() {
  return (
    <div className='blog-page'>
        <div className='top'>
            <Link to={"/"} className='back-arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' height="48" width="48"><path d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z"/></svg>
            </Link>
        </div>

    {blogData ? <div className='blog'>
        <div>
            <h1>Blogs</h1>
        </div>
        <div className='blog-content'>

        {blogData.map(blog => (
          <Link to={`/blog/${blog.id}`} className='blog-post' key={blog.id}>
            <img src={blog.img} alt={blog.title} />
            <p>{blog.date}</p>
            <h3>{blog.title}</h3>
          </Link>
        ))}
        </div>
    </div>
    : <h1>No Blogs Yet</h1>}
    </div>
  )
}

export default index