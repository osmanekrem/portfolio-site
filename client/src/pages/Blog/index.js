import React from 'react'
import { Link } from 'react-router-dom'
import "./styles.scss"

function Blog() {
  return (
    <div className='blog-page'>
        <div className='top'>
            <Link to={"/"} className='back-arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' height="48" width="48"><path d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z"/></svg>
            </Link>
        </div>
        <main>
            <section className='blog-content'>
                <h1>Blog</h1>
                <img src="https://via.placeholder.com/450x215" alt="blog-post-1" />
                <p>03.07.2022</p>
                <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </section>
            <aside>
                <h2>Recent Posts</h2>
                <ul>
                    <li>
                        <Link to={"/blog/1"}>
                            <h3>Blog Post 1</h3>
                            <p>03.07.2022</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/blog/2"}>
                            <h3>Blog Post 2</h3>
                            <p>03.07.2022</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/blog/3"}>
                            <h3>Blog Post 3</h3>
                            <p>03.07.2022</p>
                        </Link>
                    </li>
                </ul>

            </aside>
        </main>
    </div>
  )
}

export default Blog