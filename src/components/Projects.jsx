import {useEffect, useState} from 'react'
import Slider from "react-slick";
import { useSelector } from 'react-redux'

  
        


function Projects() {


    const {projects, categories} = useSelector(state => state.projects)


    const [activeTab, setActiveTab] = useState(categories[0])
    const [filteredProjects, setFilteredProjects] = useState([])
    useEffect(() => {
        setFilteredProjects((activeTab.name==="All") ? projects : projects.filter(project => project.categories.includes(activeTab._id)))
 
    }, [activeTab])

    function NextBtn({ onClick }) {
        return <button className="slider-button-left" onClick={onClick}> <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 96 960 960"><path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z"/></svg> </button>
    }

    function PrevBtn({ onClick }) {
        return <button className="slider-button-right" onClick={onClick}><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 96 960 960" fill='currentColor'><path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z"/></svg></button>
    }


    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: "linear",
        nextArrow: <NextBtn />,
        prevArrow: <PrevBtn />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    };
    console.log(filteredProjects);

    const [currentSlide, setCurrentSlide] = useState(0);
  const numVisibleCards = 2;

  function goToNextSlide() {
    setCurrentSlide((currentSlide + 1) % filteredProjects.length);
  }

  function goToPrevSlide() {
    setCurrentSlide((currentSlide - 1 + filteredProjects.length) % filteredProjects.length);
  }

  const visibleCards = [];
  const start = currentSlide;
  const end = currentSlide + numVisibleCards;
  if (end <= filteredProjects.length) {
    visibleCards.push(...filteredProjects.slice(start, end));
  } else {
    visibleCards.push(...filteredProjects.slice(start));
    const remainingCards = numVisibleCards - visibleCards.length;
    visibleCards.push(...filteredProjects.slice(0, remainingCards));
  }


  return (
    <div id='portfolio' className='portfolio'>
        <div className='portfolio-header'>
            <ul>
                {categories.map(category => (
                    <li key={category._id} onClick={() => setActiveTab(category)} className={(activeTab.name === category.name) && "active"}>{category.name}</li>
                ))}
            </ul>
        </div>
        <div className='portfolio-container'>
            { filteredProjects.length > numVisibleCards && <button className='slider-button' onClick={goToPrevSlide}>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="22" width="22" xmlns="http://www.w3.org/2000/svg">
                    <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z">
                        </path>
                        </svg>
                    </button>}
            {visibleCards
            .map(item => (
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
            { filteredProjects.length > numVisibleCards && <button className='slider-button' onClick={goToNextSlide}>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="22" width="22" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>
                    </button>}
        </div>

    </div>
  )
}

export default Projects