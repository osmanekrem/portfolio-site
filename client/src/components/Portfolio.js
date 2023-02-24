import {useEffect, useState} from 'react'
import axios from "axios"

  
        

function Portfolio() {
    const [activeTab, setActiveTab] = useState({name: "All", _id:""})
    const [projects, setProjects] = useState([])
    const [filteredProjects, setFilteredProjects] = useState([])
    const [categories, setCategories] = useState([{name: "All", _id:""}])
    useEffect(() => {
        axios.get("http://localhost:3000/categories").then(res => {
            setCategories([{name: "All", _id:""}, ...res.data.categories])
        }).catch((error) => {
            console.log(error)
        })
        axios.get(`http://localhost:3000/projects`).then(res => {
            setProjects(res.data.projects)
            setFilteredProjects(res.data.projects)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    useEffect(() => {
        setFilteredProjects((activeTab.name==="All") ? projects : projects.filter(project => project.categories.includes(activeTab._id)))
 
    }, [activeTab])
  return (
    <div id='portfolio' className='portfolio'>
        <div className='portfolio-header'>
            <h1>Portfolio</h1>
            <ul>
                {categories.map(category => (
                    <li key={category._id} onClick={() => setActiveTab(category)} className={activeTab.name === category.name ? "active" : ""}>{category.name}</li>
                ))}
            </ul>
        </div>
        <div className='portfolio-content'>
            {filteredProjects.map(item => (
                <div className='portfolio-item' key={item._id}>
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

export default Portfolio