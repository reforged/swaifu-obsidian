import React from 'react'
import { ChatBubbleLeftRightIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'

export default function Home () {
  return (
    <div>
      <h1 className="text-2xl font-medium">Good morning, Montpellier 👋</h1>
      <div className="mt-5 p-5 bg-purple-100 rounded-md inline-flex w-full items-center justify-between">
        <div className="flex gap-5">
          <div className="bg-white w-10 h-10 flex items-center justify-center rounded-md">
            <RocketLaunchIcon className="w-6 h-6 text-purple-800" />
          </div>
          <div>
            <p className="text-md font-medium">Supercharge your customer research</p>
            <p className="text-sm">Integrate apps that you use to speed up your workflow</p>
          </div>
        </div>
        <div>
          <button className="px-3 py-1.5 inline-flex items-center justify-center bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-md">Go to integration</button>
        </div>
      </div>
      <div className="mt-10 py-5">
        <div className="inline-flex w-full items-center justify-between">
          <h2 className="text-lg font-medium">Project you're working on</h2>
          <NavLink to="/articles" className="text-purple-800 text-purple-900 font-medium">See all</NavLink>
        </div>
        <div className="py-5 grid grid-cols-4 gap-5">
          {[0, 1, 2, 3].map((n): JSX.Element => (
            <div key={n} className="col-span-1 border border-gray-200 rounded-md shadow hover:shadow-xl p-5">
              <div className="w-10 h-10 flex items-center justify-center">
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-800" />
              </div>
              <div className="space-y-2">
                <p className="text-md font-medium">Lorem ipsum dolor sir amet</p>
                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 py-5">
        <h2 className="text-lg font-medium">Project you're working on</h2>
        <div className="py-5 grid grid-cols-4 gap-5">
          {[0, 1, 2, 3].map((n): JSX.Element => (
            <div key={n} className="col-span-1 border border-gray-200 rounded-md shadow p-5">
              <div className="w-10 h-10 flex items-center justify-center">
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-800" />
              </div>
              <div className="space-y-2">
                <p className="text-md font-medium">Lorem ipsum dolor sir amet</p>
                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}