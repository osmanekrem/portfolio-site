import Image from 'next/image'
import React from 'react'

export default function Logo() {
  return (
    <div className="rounded-full border-4 shrink-0 relative border-primary aspect-square w-72 h-72 flex items-center justify-center">
        <Image className="z-10" alt="logo" src="/imgs/logo.png" width={180} height={180} />
        <span className="w-72 h-72 rounded-full bg-primary opacity-15 z-0 absolute shrink-0 flex bottom-[-10%] right-[-15%]"></span>
      </div>
  )
}
