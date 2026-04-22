import logo from '@/assets/logo.svg'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

const columns: FooterColumn[] = [
  {
    title: 'About',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Features', href: '#' },
      { label: 'News', href: '#' },
      { label: 'Menu', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Why Foodeli?', href: '#' },
      { label: 'Partner With Us', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Account', href: '#' },
      { label: 'Support Center', href: '#' },
      { label: 'Feedback', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Accessibility', href: '#' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState<string>('')

  const handleSubmit = (): void => {
    if (email.trim()) {
      setEmail('')
    }
  }

  return (
    <footer className=" pt-16 pb-8">
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-200">
          <div className="lg:col-span-1 flex flex-col gap-5">
            <a href="/" className="inline-flex items-center">
              <img src={logo} alt="Foodeli" className="w-24 h-auto" />
            </a>
            <p className="text-sm font-['Poppins'] text-gray-500 leading-relaxed">
              Delivering happiness to your door. Fresh, fast and always
              delicious.
            </p>

            <div className="flex items-center gap-3">
              <a href="#">
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#">
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a href="#">
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="">
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
            </div>
          </div>
          {columns.map((col: FooterColumn) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h3 className="text-sm font-['Poppins'] font-semibold text-gray-900">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link: FooterLink) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm font-['Poppins'] text-gray-500 hover:text-[#EB0029] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-['Poppins'] font-semibold text-gray-900">
              Get in Touch
            </h3>
            <p className="text-sm font-['Poppins'] text-gray-500 leading-relaxed">
              Question or feedback? We'd love to hear from you.
            </p>
            <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-2.5 gap-2 focus-within:border-[#EB0029] transition-colors">
              <input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                className="flex-1 text-sm font-['Poppins'] text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
              />
              <button onClick={handleSubmit}>
                <PaperAirplaneIcon className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-['Poppins'] text-gray-400 text-center sm:text-left">
            © {new Date().getFullYear()} Foodeli. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm font-['Poppins'] text-gray-400 hover:text-[#EB0029] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm font-['Poppins'] text-gray-400 hover:text-[#EB0029] transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
