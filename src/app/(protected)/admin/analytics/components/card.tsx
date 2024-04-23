import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    children: React.ReactNode,
    className?: string
}

export default function Card({children, className}: Props) {
  return (
    <div className={cn(className, "bg-card rounded-md border p-4")}>{children}</div>
  )
}