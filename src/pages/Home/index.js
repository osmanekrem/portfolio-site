import React, { useEffect, useState } from 'react'
import "./styles.scss"
import Contact from "../../components/Contact";

import Footer from "../../components/Footer";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Logo from '../../components/Logo';
import Content from '../../components/Content';
import { setCategories, setProjects } from '../../redux/projects';

function Home() {
  // const [blogs, setBlogs] = useState([])

  // const getBlogs = async () => {
  //   try {
  //     const response = await axios.get(process.env.REACT_APP_API_BASE_URL+'/blogs');
  //     setBlogs(response.data.data)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  
  //   useEffect(() => {
  //     getBlogs()
  //   },[])

  const dispatch = useDispatch()
  useEffect(() => {
      axios.get(process.env.REACT_APP_API_BASE_URL+"/categories").then(res => {
          dispatch(setCategories([{name: "All", _id:""}, ...res.data.categories]))
      }).catch((error) => {
          console.log(error)
      })
      axios.get(process.env.REACT_APP_API_BASE_URL+"/projects").then(res => {
          dispatch(setProjects(res.data.projects))
      }).catch((error) => {
          console.log(error)
      })
  }, [])
  
  return (
    <>
      <div className='container'>
        <div className='logo-contact'>
          <Logo />
          <Contact />
        </div>
        <Content />
        <Footer />
      </div>
      
    </>
  )
}

export default Home