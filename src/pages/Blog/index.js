import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link, useParams } from 'react-router-dom'
import "./styles.scss"

function Blog() {

    const [blog, setBlog] = useState({})
    const [blogs, setBlogs] = useState([])

    const {slug} = useParams()


    const getBlog = (slug) => {
        axios.get(process.env.REACT_APP_API_BASE_URL+"/blogs/"+slug).then(res => {
            setBlog(res.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const getBlogs = () => {
        axios.get(process.env.REACT_APP_API_BASE_URL+"/blogs").then(res => {
            setBlogs(res.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getBlog(slug)
        getBlogs()
        console.log(blog, blogs);
    }, [slug])
    
   return (
    <div className='blog-page'>
        <div className='top'>
            <Link to="/" className='back-arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' height="48" width="48"><path d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z"/></svg>
            </Link>
        </div>
        <main>
            {
            blog ? <section className='blog-content'>
                <img src={blog.image} alt={blog.title} />
                <h1>{blog.title}</h1>
                <p>{blog.date?.substr(0,10)}</p>
                <ReactMarkdown>{blog.content}</ReactMarkdown>
            </section> : null}
            <aside>
                <h2>Other Posts</h2>
                <ul>

                    { 
                    blogs?.map((b) => 
                        <li key={b.slug}>
                            <Link to={`/blog/${b.slug}`}>
                                <h3>{b.title}</h3>
                                <p>{b.date.substr(0,10)}</p>
                            </Link>
                        </li>
                    )
                    }
                </ul>
                <div className='ads'>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4254290053974096"
                    crossOrigin="anonymous"></script>
                <ins className="adsbygoogle"
                    style={{display:"block"}}
                    data-ad-client="ca-pub-4254290053974096"
                    data-ad-slot="1469718477"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
                </div>

            </aside>
        </main>
    </div>
  )
}

export default Blog