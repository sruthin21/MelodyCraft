import Image from 'next/image'
import JoinSpaceForm from '../components/JoinSpaceForm'

import React from 'react'

const page = () => {
  return (
    <div>
       <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Join the Space
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Connect with musicians, share your creations, and explore new sounds in our vibrant community.
            </p>
            <JoinSpaceForm />
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <Image
              src="/image.png"
              alt="Music visualization"
              width={500}
              height={500}
              className="music-rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default page
