import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function AdminProjectsLayout({children}: {children:React.ReactNode}) {

  return (
    <div className="flex w-full flex-col space-y-8 py-8">
      <div className="flex justify-start items-center w-full gap-x-4">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <Link href="/admin/projects/create" className={cn("flex gap-x-2 items-center",buttonVariants({variant:"outline"}))} > <PlusCircleIcon size={16} /> Create</Link>
      </div>
      {children}
    </div>
  )
}
