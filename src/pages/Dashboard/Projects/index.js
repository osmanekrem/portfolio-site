import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./styles.css"

export default function Projects({token}) {

    const [projects, setProjects] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [live, setLive] = useState("")
    const [github, setGithub] = useState("")
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])

    const getCategories = () => {
        axios.get(process.env.REACT_APP_API_BASE_URL+"/categories").then(res => {
            setCategories(res.data.categories)
        }).catch((error) => {
            console.log(error)
        })
    }



    const getProjects = () => {
        axios.get(process.env.REACT_APP_API_BASE_URL+"/projects").then(res => {
            setProjects(res.data.projects)
        }).catch((error) => {
            console.log(error)
        })
    }

    const deleteProject = (id) => {
        axios.delete(process.env.REACT_APP_API_BASE_URL+`/projects/${id}`)
          .then(response => {
            getProjects()
            console.log(response.data);
            // Öğe başarıyla silindi.
          })
          .catch(error => {
            console.error(error);
          });
      }

    const createProject = async (e) => {
        const formData = new FormData()
        formData.append('name', name);
        formData.append('description', description);
        formData.append('live', live);
        formData.append('github', github);
        formData.append('image', image);
        formData.append("categories", selectedCategories)
        e.preventDefault()
        const config = {
            headers: {
              'Authorization': `${token}`, // JWT'yi isteğe ekle
              'Content-Type': 'multipart/form-data'
            }
          };
      
          try {
            const response = await axios.post(process.env.REACT_APP_API_BASE_URL+'/projects', formData, config);
            if(response.status===201){
              getProjects()
                setName("")
                setDescription("")
                setImage("")
                setLive("")
                setGithub("")
                setSelectedCategories([])
            }
          } catch (error) {
            console.error(error);
          }
        };

    useEffect(() => {
        getProjects()
        getCategories()
    },[])
    
    return (
        <div className='projects'>
                <h4>Projects</h4>
                <div className='project-form'>
                        <form onSubmit={createProject}>
                            <div>
                                <label htmlFor='project-image' className='project-image'>
                                    {image ? <img alt="project" src={URL.createObjectURL(image)} /> : <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
                                        <path d="M773 402v-86h-86v-60h86v-87h60v87h87v60h-87v86h-60ZM94 976q-24 0-42-18t-18-42V403q0-23 18-41.5T94 343h147l73-87h280v60H342l-73 87H94v513h680V496h60v420q0 24-18.5 42T774 976H94Zm339.5-146q72.5 0 121.5-49t49-121.5q0-72.5-49-121T433.5 490q-72.5 0-121 48.5t-48.5 121q0 72.5 48.5 121.5t121 49Zm0-60q-47.5 0-78.5-31.5t-31-79q0-47.5 31-78.5t78.5-31q47.5 0 79 31t31.5 78.5q0 47.5-31.5 79t-79 31.5Zm.5-110Z"/>
                                    </svg>}
                                </label>
                                <div>
                                    <input placeholder='name' value={name} onChange={e => setName(e.target.value)} />
                                    <textarea placeholder='description' value={description} onChange={e => setDescription(e.target.value)} />

                                </div>
                            </div>

                            <input 
                                style={{display: "none"}}
                                type="file"
                                id="project-image"
                                onChange={(e) => {
                                    setImage(e.target.files[0])   
                                }}
                                accept="image/jpg, image/jpeg, image/png"
                            />
                            <input placeholder='live URL' value={live} onChange={e => setLive(e.target.value)} />
                            <input placeholder='github URL' value={github} onChange={e => setGithub(e.target.value)} />
                            <div className='categories'>
                                {
                                    categories.map((category, i) => (
                                        <span key={i} className={selectedCategories.includes(category._id) ? "active" : "diactive"}>
                                            {category.name} 
                                            <button type='button' onClick={() => selectedCategories.includes(category._id) 
                                                ? setSelectedCategories(prev => prev.filter(c => c !== category._id))
                                                : setSelectedCategories(prev => [...prev, category._id]) 
                                            }>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 48 48' height={24} width={24}><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg>
                                            </button>
                                        </span>
                                    ))
                                }
                            </div>
                            <button className='add' type='submit'>Add</button>
                        </form>
                </div>
                <div className='portfolio-content'>
                {projects.map(item => (
                    
                    <div className='portfolio-item' key={item._id}>
                        <span>
                            <button onClick={() => deleteProject(item._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 48 48' height={24} width={24}><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg>
                            </button>
                        </span>
                        <div className='portfolio-item-content'>
                            <img src={item.image} alt={item.name} />
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                        </div>
                        <div className='portfolio-item-links'>
                            {item.live && <a className='demo-link' href={item.live} rel="noreferrer" target='_blank'>Live</a>}
                            <a href={item.github} rel="noreferrer" target='_blank'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 16 16" width="20"><path fill='currentColor' d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                            </a>
                        </div>
                    </div>
                ))}
        </div>
            </div>
  )
}
