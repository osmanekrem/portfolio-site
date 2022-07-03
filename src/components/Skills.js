import React from 'react'

const skills = [
    
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg',    
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg',    
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg',    
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg',    
    'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',    
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',    
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',    
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',    
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',    
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg',    
    'https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg', 
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg',    
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-line.svg',    
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/blender/blender-original.svg',    
]

function Skills() {
  return (
    <div className='skills'>
            <h1>My Skills</h1>
            <div className='skills-container'>
                {skills.map(skill => (
                    <div className='skill' key={skill}>
                        <img src={skill} alt="skill" />
                    </div>
                ))}
            </div>
    </div>
  )
}

export default Skills