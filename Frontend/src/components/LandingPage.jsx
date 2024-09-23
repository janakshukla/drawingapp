import React from 'react'
import { Pencil, Users, Share2, Layers } from 'lucide-react'
import { Link } from "react-router-dom";
import { Button } from './ui/button'


const LandingPage = () => {

    const BoardId = parseInt(Math.random()*10000000)

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center justify-center">
          <Pencil className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">FunDraw</span>
        </a>
        <div className="flex gap-4">
         
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Collaborate in Real-Time with Our Drawing App
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Create, share, and edit drawings with your team in real-time. Boost productivity and creativity with our intuitive multi-user drawing tool.
                </p>
              </div>
              <div className="space-x-4">
                <Link to={`/drawing/${BoardId}`}>
                <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start">
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg">
                <Users className="w-12 h-12 text-blue-500" />
                <h3 className="text-xl font-bold">Multi-User Collaboration</h3>
                <p className="text-sm text-gray-400 text-center">
                  Work together in real-time with your team members.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg">
                <Share2 className="w-12 h-12 text-green-500" />
                <h3 className="text-xl font-bold">Easy Sharing</h3>
                <p className="text-sm text-gray-400 text-center">
                  Share your drawings with a single click.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg">
                <Layers className="w-12 h-12 text-purple-500" />
                <h3 className="text-xl font-bold">Layer Support</h3>
                <p className="text-sm text-gray-400 text-center">
                  Create complex drawings with multiple layers.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg">
                <Pencil className="w-12 h-12 text-red-500" />
                <h3 className="text-xl font-bold">Various Tools</h3>
                <p className="text-sm text-gray-400 text-center">
                  Access a wide range of drawing tools and brushes.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Start Drawing Together?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                  Join thousands of teams already using our platform to collaborate on drawings and designs.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
               
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-gray-400">
          © 2023 FunDraw Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a href="#" className="text-xs hover:underline underline-offset-4 text-gray-400">
            Terms of Service
          </a>
          <a href="#" className="text-xs hover:underline underline-offset-4 text-gray-400">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  )
}

export default LandingPage