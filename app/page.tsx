'use client'

import {Headphones, Radio, Mic2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from 'next-auth/react';
import Redirect from './Home/components/Redirect';

export default function LandingPage() {
  const session = useSession();
  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-r from-slate-900 to-indigo-600`}>
       <Redirect/>
       <div className='flex justify-between bg-cyan-700'>
        <div className='m-4 font-bold text-3xl'>
          Music
        </div>
        <div>
          {session.data?.user && <button className='m-2 p-2 bg-blue-400' onClick={()=> signOut()}>Logout</button>  }
          <button className='m-2 p-2 bg-blue-400' onClick={()=> signIn()}>SignIn</button>
        </div>
    </div>
      <main className="flex-grow">
        <section className="hero py-20 px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-white">Discover Your Sound</h1>
          <p className="text-xl mb-8 text-gray-200">Unleash the power of music with our cutting-edge application</p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
            Get Started
          </Button>
        </section>

        <section className="features py-20 px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Headphones, title: "High-Quality Streaming" },
              { icon: Radio, title: "Personalized Playlists" },
              { icon: Mic2, title: "Live Concerts" },
            ].map((feature, index) => (
              <div key={index} className="text-center bg-white bg-opacity-10 p-6 rounded-lg">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-purple-300" />
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta py-20 px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Start Your Musical Journey?</h2>
          <p className="text-xl mb-8 text-gray-200">Join millions of music lovers today</p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
            Sign Up Now
          </Button>
        </section>
      </main>

      <footer className="w-full p-4 bg-black bg-opacity-20 text-center text-gray-300">
        © 2023 MusicApp. All rights reserved.
      </footer>
    </div>
  )
}

