import { auth, signOut } from '@/auth'
import React from 'react'

export default async function DashboardPage() {

  const session = await auth()

  return (
    <div>DashboardPage
      {JSON.stringify(session)}
    </div>
  )
}
