import React from 'react'
import Navbar from './navbar'
import { DarkModeToggle } from '@/components/theme-toggle'
import UserButton from './user-button'

export default function Header() {
  return (
    <header className='h-16 flex items-center justify-between w-full'>
      <Navbar />
      <div className='pl-2 flex gap-x-2 items-center'>
        <UserButton />
        <DarkModeToggle />
      </div>
    </header>
  )
}
