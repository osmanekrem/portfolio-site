import React from 'react'
import { Link } from 'react-scroll'

function Hello() {
  return (
    <div className='intro'>
      Hi there I'm <span>Osman Ekrem Korkmaz</span>
      <Link to='blog' className="down-arrow scroll-blog" spy={true} smooth={true} duration={500}>
      Read the blog
      </Link>
      <Link to='about' className="down-arrow" spy={true} smooth={true} duration={500}>
      <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' height="48" width="48"><path d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z"/></svg>
      </Link>
    </div>
  )
}

export default Hello