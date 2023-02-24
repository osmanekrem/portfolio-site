import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./styles.css"

export default function Blogs({token}) {
    const [image, setImage] = useState("")
    const [blogs, setBlogs] = useState([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")



    const getBlogs = () => {
        axios.get(process.env.REACT_APP_API_BASE_URL+"/blogs").then(res => {
            setBlogs(res.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const deleteBlog = (slug) => {
        axios.delete(process.env.REACT_APP_API_BASE_URL+`/blogs/${slug}`,{
            headers: {
              'Authorization': token
            }
          })
          .then(response => {
            getBlogs()
            // Öğe başarıyla silindi.
          })
          .catch(error => {
            console.error(error);
          });
      }

    const createBlog = async (e) => {
        const formData = new FormData()
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);
        e.preventDefault()
        const config = {
            headers: {
              'Authorization': `${token}`, // JWT'yi isteğe ekle
              'Content-Type': 'multipart/form-data'
            }
          };
      
          try {
            const response = await axios.post(process.env.REACT_APP_API_BASE_URL+'/blogs', formData, config);
            if(response.status===201){
              getBlogs()
            }
          } catch (error) {
            console.error(error);
          }
        };

    useEffect(() => {
        getBlogs()
    },[])
    
    return (
        <div className='blogs'>
                <h4>Blogs</h4>
                <div className='blog-form'>
                        <form onSubmit={createBlog}>
                            <div>
                                <label htmlFor='blog-image' className='blog-image'>
                                    {image ? <img alt="blog" src={URL.createObjectURL(image)} /> : <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
                                        <path d="M773 402v-86h-86v-60h86v-87h60v87h87v60h-87v86h-60ZM94 976q-24 0-42-18t-18-42V403q0-23 18-41.5T94 343h147l73-87h280v60H342l-73 87H94v513h680V496h60v420q0 24-18.5 42T774 976H94Zm339.5-146q72.5 0 121.5-49t49-121.5q0-72.5-49-121T433.5 490q-72.5 0-121 48.5t-48.5 121q0 72.5 48.5 121.5t121 49Zm0-60q-47.5 0-78.5-31.5t-31-79q0-47.5 31-78.5t78.5-31q47.5 0 79 31t31.5 78.5q0 47.5-31.5 79t-79 31.5Zm.5-110Z"/>
                                    </svg>}
                                </label>
                                <div>
                                    <input placeholder='name' value={title} onChange={e => setTitle(e.target.value)} />
                                    <textarea placeholder='description' value={content} onChange={e => setContent(e.target.value)} />

                                </div>
                            </div>

                            <input 
                                style={{display: "none"}}
                                type="file"
                                id="blog-image"
                                onChange={(e) => {
                                    setImage(e.target.files[0])   
                                }}
                                accept="image/jpg, image/jpeg, image/png"
                            />
                            <button className='add' type='submit'>Add</button>
                        </form>
                </div>
                <div className='blog-content'>
                {blogs.map(item => (
                    
                    <div className='blog-item' key={item._id}>
                        <span>
                            <button onClick={() => deleteBlog(item.slug)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 48 48' height={24} width={24}><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg>
                            </button>
                        </span>
                        <div className='blog-item-content'>
                            <img src={item.image} alt={item.title} />
                            <h3>{item.title}</h3>
                            <p>{item.date.substr(0,10)}</p>
                            <Link to={"/blog/"+item.slug}>Live</Link>
                        </div>
                    </div>
                ))}
        </div>
            </div>
  )
}
