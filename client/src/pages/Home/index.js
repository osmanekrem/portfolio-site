import React from 'react'
import "./styles.scss"
import About from "../../components/About";
import Blog from "../../components/Blog";
import Contact from "../../components/Contact";
import Intro from "../../components/Intro";
import Portfolio from "../../components/Portfolio";
import Skills from "../../components/Skills";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useSelector } from 'react-redux';

function Home() {
  const {blogs} = useSelector(state => state.blogs)
  return (
    <>
      <Header />
      <div className='home'>
          <Intro  className="article"/>
          <About  className="article"/>
          {blogs.length ? <Blog  className="article"/> : <></>}
          <Skills  className="article"/>
          <Portfolio  className="article"/>
          <Contact  className="article"/>
      <Footer />
      </div>
      
    </>
  )
}

export default Home