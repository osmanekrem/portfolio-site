import React from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import "./styles.scss"
function index() {
    const {blogs} = store.getState().blogs
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
            </ul>
        </nav>
    </header>
  )
}

export default index