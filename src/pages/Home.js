import React from 'react'
import About from "../components/About";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import Intro from "../components/Intro";
import Portfolio from "../components/Portfolio";
import Skills from "../components/Skills";

function Home() {
  return (
    <div className='home'>
        <Intro  className="article"/>
        <About  className="article"/>
        <Blog  className="article"/>
        <Skills  className="article"/>
        <Portfolio  className="article"/>
        <Contact  className="article"/>
    </div>
  )
}

export default Home