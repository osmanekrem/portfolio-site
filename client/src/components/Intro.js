import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Hello() {
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
    <div id='home' className='intro'>
      Hi there I'm <span>Osman Ekrem Korkmaz</span>
      {blogs.length ? <a href='#blog' className="down-arrow scroll-blog">
      Read the blog
      </a>: <></>}
      <a href='#about' className="down-arrow">
      <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' height="48" width="48"><path d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z"/></svg>
      </a>
    </div>
  )
}

export default Hello