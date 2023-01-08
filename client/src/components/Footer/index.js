import React from 'react'

function index() {
  return (
    <div className='footer'>
        <svg className="waves" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
            <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax">
            <use href="#gentle-wave" x="48" y="0" fill="currentColor" />
            <use href="#gentle-wave" x="48" y="3" fill="currentColor" />
            <use href="#gentle-wave" x="48" y="5" fill="currentColor" />
            <use href="#gentle-wave" x="48" y="7" fill="currentColor" />
            </g>
        </svg>
    </div>
  )
}

export default index