import { useState, MouseEvent } from 'react'
import {
  ArrowLeftEndOnRectangleIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import logo from '@/assets/logo.svg'
import CartDrawer from './CartDrawer'
import { useCart } from '../context/CartContext'

interface NavLink {
  label: string
  href: string
}

const LoginButton = ({ className = '' }: { className?: string }) => (
  <button
    className={`flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium transition-colors ${className}`}
  >
    <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
    <span>Login</span>
  </button>
)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  // const [cartOpen, setCartOpen] = useState<boolean>(false)
  const { totalItems, openCart, closeCart, isCartOpen } = useCart()

  const navLinks: NavLink[] = [
    { label: 'Why Foodeli?', href: '#why-foodeli' },
    { label: 'Services', href: '#service' },
    { label: 'Menu', href: '#menu' },
    { label: 'Contact', href: '#feedback' },
  ]

  const handleNavClick = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string
  ): void => {
    e.preventDefault()
    setIsOpen(false)
    const section = document.querySelector(href)
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <nav className="w-full bg-white border-b border-gray-100 h-16 flex items-center justify-between  sticky top-0 z-30">
        <a href="/" className="flex items-center shrink-0">
          <img src={logo} alt="logo" className="w-25 h-25" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors flex flex-col items-center group font-poppins"
            >
              {link.label}
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 mt-1" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-gray-50 transition-colors">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>

          <button
            onClick={() => openCart()}
            className="relative p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-gray-50 transition-colors"
          >
            <ShoppingBagIcon className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-semibold">
                {totalItems}
              </span>
            )}
          </button>

          <LoginButton className="hidden sm:flex px-4 py-2 rounded-lg text-sm" />

          <button
            className="md:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* --- Mobile Sidebar Panel --- */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-gray-50">
          <img src={logo} alt="logo" className="w-12 h-12" />
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-red-500 transition-colors p-2"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col px-4 py-6 gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="flex items-center justify-between px-6 py-4 text-lg font-medium text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group"
            >
              {link.label}
              <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-red-500 transition-colors" />
            </a>
          ))}
        </div>

        <div className="mt-auto p-6 border-t border-gray-50">
          <LoginButton className="w-full py-4 rounded-2xl shadow-lg shadow-red-100 justify-center" />
        </div>
      </aside>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </div>
  )
}
