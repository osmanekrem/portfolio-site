import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { store } from '../../redux/store'
import "./styles.scss"
function Header() {
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
    const {token} = store.getState().auth
  return (
    <header className='header'>
        <nav>
            <ul>
                <li>
                    <a href="#home">Home</a>
                </li>
                <li>
                    <a href="#about">About</a>
                </li>
                {blogs.length ? <li>
                    <a href="#blog">Blog</a>
                </li>: <></>}
                <li>
                    <a href="#skills">Skills</a>
                </li>
                <li>
                    <a href="#portfolio">Portfolio</a>
                </li>
                <li>
                    <a href="#contact">Contact</a>
                </li>
                {token ? <Link className='dashboard' to="/dashboard">Dashboard 
                <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' height="20" viewBox="0 96 960 960" width="20"><path d="M120 536V216h320v320H120Zm0 400V616h320v320H120Zm400-400V216h320v320H520Zm0 400V616h320v320H520Z"/></svg>
                </Link>
                 : null}
            </ul>
        </nav>
    </header>
  )
}

export default Header