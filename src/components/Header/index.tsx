import React from 'react'
import Navbar from './navbar'
import { DarkModeToggle } from '@/components/theme-toggle'

export default function Header() {
  return (
    <header className='h-16 flex items-center justify-between w-full'>
      <Navbar />
      <div className='pl-2 flex'>
        <DarkModeToggle />
      </div>
    </header>
  )
}
