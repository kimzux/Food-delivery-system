import {
  ArrowLeftEndOnRectangleIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import logo from '@/assets/logo.svg'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const lists: string[] = ['Why Foodeli?', 'Services', 'Menu', 'Contact']

  return (
    <div>
      <nav className="w-full bg-white border-b border-gray-100  h-12 flex items-center justify-between sticky top-0 z-30 ">
        <a href="/" className="flex items-center">
          <img src={logo} alt="logo" className="w-25 h-25" />
        </a>

        <div className="hidden md:flex items-center gap-7">
          {lists.map((list) => (
            <a
              key={list}
              href="#"
              className="text-sm text-gray-500 hover:text-red-500 transition-colors flex flex-col items-center group font-poppins"
            >
              {list}
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 mt-1" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-colors">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>

          <button className="relative p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-colors">
            <ShoppingBagIcon className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>

          <button className="hidden sm:flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
            <span>Login</span>
          </button>

          {!isOpen && (
            <button
              className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(true)}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          )}
        </div>
      </nav>

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-gray-50">
          <img src={logo} alt="logo" className="w-20 h-20" />
          <button
            onClick={() => setIsOpen(false)}
            className="text-3xl font-light text-gray-400 hover:text-red-500 transition-colors p-2"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col px-4 py-6 gap-2">
          {lists.map((list) => (
            <a
              key={list}
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-end gap-3 px-6 py-4 text-lg font-medium text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group"
            >
              {list}
              <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-red-500 transition-colors" />
            </a>
          ))}
        </div>

        <div className="mt-auto p-6 border-t border-gray-50">
          <button className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-4 rounded-2xl transition-colors shadow-lg shadow-red-200">
            <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  )
}
