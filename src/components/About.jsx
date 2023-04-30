import React, { useEffect, useRef } from 'react'
import Typewritter from "typewriter-effect"


function About() {
  const ref = useRef()

  return (
    <div id='about' className='about'>
        <div>            
          
            <h1>
                I'm a <Typewritter
                options={{
                  autoStart: true,
                  delay: 40,
                  loop: true,
                  strings: [
                    "Web Developer",
                    "Beşiktaş Fan",
                    "Turk",
                    "Muslim"
                  ]
                }}
                />
            </h1>
            <div className='about-text'>
              
            <p>Hi, I'm Osman Ekrem. I was born and raised in Ankara, the capital city of Turkey.</p><p>
I started the software with arduino and then I learned languages ​​such as python, java, javascript, then I learned reactjs, css, scss and progressed to become a full stack web developer.</p>

<p> In the future, I plan to turn to one of the fields such as artificial intelligence, data science, cyber security, cryptology.
            </p>
            </div>
        </div>
    </div>
  )
}

export default About