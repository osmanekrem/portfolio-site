import { auth } from '@/auth'
import React from 'react'

export default async function DashboardPage() {

  const session = await auth()

  return (
    <div className="flex w-full flex-col space-y-8 py-8">
      <div className="flex justify-start items-center w-full ">
        <h1 className="text-3xl font-semibold">Welcome back {session?.user?.name}!</h1></div>
      <pre>{JSON.stringify(session,null,2)}</pre>
    </div>
  )
}
