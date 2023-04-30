import React, { useState } from 'react'
import About from './About'
import Projects from './Projects'
import Skills from './Skills'

export default function Content() {

    const tabs = ["About","Skills","Projects"]
  const [activeTab, setActiveTab] = useState(tabs[0])

  const renderComponent = () => {
    switch (activeTab) {
        case "About" : return <About />
        case "Skills" : return <Skills />
        case "Projects" : return <Projects />
    }
  }

  return (
    <div className='content-area'>
          <nav>
            <ul>
              {tabs.map(tab => <li className={activeTab === tab && "active"} onClick={() => setActiveTab(tab)}>{tab}</li>)}
            </ul>
          </nav>
          <div className='content'>
            {renderComponent()}
          </div>
        </div>
  )
}
