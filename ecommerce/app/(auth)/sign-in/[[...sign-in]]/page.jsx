import React from 'react'
import { SignIn } from '@clerk/nextjs'

export default function page() {
  return (
<section className="bg-white">
    <div className="min-h-screen flex justify-center items-center">
      <SignIn />
    </div>
  </section>
  )
}
