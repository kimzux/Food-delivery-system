import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import P1 from '@/assets/p1.png'
import P2 from '@/assets/p2.png'
import P3 from '@/assets/p3.png'
import Feedback1 from '@/assets/feedback.png'

interface Feedback {
  id: number
  name: string
  role: string
  rating: number
  review: string
  image: string
  avatar: string
}

const feedbacks: Feedback[] = [
  {
    id: 1,
    name: 'Theresa Jordan',
    role: 'Food Enthusiast',
    rating: 4.8,
    review:
      'Foodeli is the best. Besides the many and delicious meals, the service is also very good, especially in the very fast delivery. I highly recommend Foodeli to you.',
    image: Feedback1,
    avatar: P1,
  },
  {
    id: 2,
    name: 'James Mitchell',
    role: 'Food Blogger',
    rating: 4.7,
    review:
      'Amazing experience every single time. The food always arrives hot and fresh. The variety of options is incredible and the prices are very reasonable.',
    image: Feedback1,
    avatar: P2,
  },
  {
    id: 3,
    name: 'Sarah Williams',
    role: 'Regular Customer',
    rating: 4.9,
    review:
      'I order from Foodeli almost every day. The delivery is always on time and the food quality never disappoints. Best food delivery app I have ever used.',
    image: Feedback1,
    avatar: P3,
  },
]

export default function FeedbackSection() {
  const [current, setCurrent] = useState<number>(0)

  const prev = (): void => {
    setCurrent((prev: number) => (prev === 0 ? feedbacks.length - 1 : prev - 1))
  }

  const next = (): void => {
    setCurrent((prev: number) => (prev === feedbacks.length - 1 ? 0 : prev + 1))
  }

  const active: Feedback = feedbacks[current]

  return (
    <section id="feedback" className="py-16">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Left — image */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="relative ">
            <img
              src={active.image}
              alt={active.name}
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </div>

        {/* Right — content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          {/* Label */}
          <div>
            <p className="text-sm font-['Poppins'] font-semibold text-[#EB0029] uppercase tracking-widest mb-2">
              What They Say
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-['Rubik'] font-bold text-gray-900 leading-snug">
              What Our Customers Say <br className="hidden md:block" />
              About Us
            </h2>
          </div>

          {/* Review text */}
          <p className="text-gray-500 font-['Poppins'] text-base leading-relaxed">
            "{active.review}"
          </p>

          {/* Reviewer info */}
          <div className="flex items-center gap-4">
            <img
              src={active.avatar}
              alt={active.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
            />
            <div>
              <p className="font-['Poppins'] font-semibold text-gray-800">
                {active.name}
              </p>
              <p className="text-sm font-['Poppins'] text-gray-400">
                {active.role}
              </p>
              {/* Rating */}
              <div className="flex items-center gap-1 mt-1">
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-['Poppins'] font-semibold text-gray-700">
                  {active.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-[#EB0029] hover:text-[#EB0029] transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#EB0029] text-white hover:bg-red-600 transition-colors"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2 ml-2">
              {feedbacks.map((_: Feedback, i: number) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 bg-[#EB0029]' : 'w-2 bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
