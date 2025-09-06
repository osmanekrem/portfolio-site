import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
      <>
      <main className="max-w-7xl px-4 md:px-20 mx-auto w-full flex flex-col flex-1">
        <div className='flex h-full w-full items-center justify-center'>
        <div className='flex flex-col items-center'>

        <h1 className='font-black text-8xl'>404</h1>
        <h2 className='font-black text-6xl text-center'>Not Found</h2>
        <p className='text-lg my-4 text-center'>Could not find requested resource</p>
        <Link className={cn(buttonVariants({size: "lg"}),)} href="/"><HomeIcon className='mr-2 size-6' /> Return Home</Link>
        </div>
      </div>
      </main>
    </>
      
    )
  }