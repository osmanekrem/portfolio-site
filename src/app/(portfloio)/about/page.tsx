import { Metadata } from 'next'
import React from 'react'
import Skills from './components/skills';
import AboutText from './components/about-text';

export const metadata: Metadata = {
    title: "About",
};

export default function AboutPage() {
  return (
    <div className='flex mt-4 gap-y-4 flex-col w-full h-full'>
      <AboutText />
      <Skills />
    </div>
  )
}
