import React from 'react'
import { SignUp } from "@clerk/nextjs";

export default function page() {
  return (
  <section className="bg-white">
    <div className="min-h-screen flex justify-center items-center">
      <SignUp />
    </div>
  </section>
  )
}
