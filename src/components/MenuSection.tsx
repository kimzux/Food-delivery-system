import { useState, useRef, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { api } from '../services/api'
import type { Category } from '../types/category'
import type { Food } from '../types/food'
import { useCart } from '../context/CartContext'

const ITEMS_PER_PAGE: number = 2
const CARD_WIDTH: number = 320

export default function MenuSection() {
  const [categories, setCategories] = useState<Category[]>([])
  const [foods, setFoods] = useState<Food[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [current, setCurrent] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [foodsLoading, setFoodsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { addItem, openCart } = useCart()

  const handleAddToCart = (item: Food): void => {
    addItem({
      foodId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: getImageUrl(item),
    })
    openCart()
  }
  console.log(handleAddToCart)

  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      try {
        const res = await api.categories.getAll()
        setCategories(res.data)
        if (res.data.length > 0) {
          setActiveCategory(res.data[0].slug)
        }
      } catch (err) {
        setError('Failed to load categories')
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    if (!activeCategory) return

    const fetchFoods = async (): Promise<void> => {
      try {
        setFoodsLoading(true)
        const res = await api.foods.getByCategory(activeCategory)
        setFoods(res.data)
        setCurrent(0)
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        }
      } catch (err) {
        setError('Failed to load foods')
      } finally {
        setFoodsLoading(false)
      }
    }
    fetchFoods()
  }, [activeCategory])

  const handleCategoryChange = (slug: string): void => {
    setActiveCategory(slug)
  }

  const prev = (): void => {
    const newIndex: number =
      current === 0 ? foods.length - ITEMS_PER_PAGE : current - 1
    setCurrent(newIndex)
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: newIndex * CARD_WIDTH,
        behavior: 'smooth',
      })
    }
  }

  const next = (): void => {
    const newIndex: number =
      current >= foods.length - ITEMS_PER_PAGE ? 0 : current + 1
    setCurrent(newIndex)
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: newIndex * CARD_WIDTH,
        behavior: 'smooth',
      })
    }
  }

  const handleScroll = (): void => {
    if (scrollRef.current) {
      const scrollLeft: number = scrollRef.current.scrollLeft
      const index: number = Math.round(scrollLeft / CARD_WIDTH)
      setCurrent(index)
    }
  }

  const getImageUrl = (food: Food): string => {
    if (!food.image || food.image.length === 0) return '/assets/placeholder.png'

    const image = food.image[0]
    const url = image.formats?.medium?.url || image.url

    return `${import.meta.env.VITE_API_URL}${url}`
  }
  if (loading) {
    return (
      <section id="menu" className="py-16 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </section>
    )
  }

  if (error) {
    return (
      <section id="menu" className="py-16 flex justify-center items-center">
        <p className="text-gray-400 font-['Poppins']">{error}</p>
      </section>
    )
  }

  return (
    <section id="menu" className="py-16">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-12">
        <div className="lg:w-1/3 font-['Rubik']">
          <h2 className="text-lg font-semibold text-[#EB0029] mb-4">Menu</h2>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Menu That Always Makes You Fall In Love
          </h1>
        </div>

        <div className="flex items-center gap-3 lg:self-end">
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
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 shrink-0 relative lg:mr-24">
          <div className="hidden lg:block absolute -right-20 top-0 bottom-0 w-1 bg-gray-100 rounded-full" />

          {categories.map((cat: Category) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 whitespace-nowrap lg:whitespace-normal ${
                activeCategory === cat.slug
                  ? 'text-white'
                  : 'hover:text-[#EB0029]'
              }`}
            >
              <span
                className={`absolute inset-0 rounded-full transition-all duration-200 ${
                  activeCategory === cat.slug
                    ? 'bg-red-500'
                    : 'group-hover:bg-red-50'
                }`}
              />

              <div className="relative z-10 flex items-center gap-3 pr-6">
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-base transition-all duration-200 ${
                    activeCategory === cat.slug
                      ? 'bg-white shadow-sm'
                      : 'group-hover:bg-white group-hover:shadow-sm'
                  }`}
                >
                  {cat.icons}
                </span>
                <span className="text-base font-['Poppins'] font-medium">
                  {cat.name}
                </span>
              </div>

              <span
                className={`hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2 w-1 rounded-full bg-[#EB0029] transition-all duration-300 ${
                  activeCategory === cat.slug
                    ? 'h-12 opacity-100'
                    : 'h-0 opacity-0'
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          {foodsLoading ? (
            <div className="flex justify-center items-center h-56">
              <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
              >
                {foods.map((item: Food) => (
                  <div
                    key={item.id}
                    className="w-[calc(50%-12px)] min-w-[calc(50%-12px)] snap-start rounded-2xl overflow-hidden group shrink-0 relative"
                  >
                    <div className="relative w-full h-full min-h-56 overflow-hidden">
                      <img
                        src={getImageUrl(item)}
                        alt={item.name}
                        className="h-64 md:h-96 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 text-[#EB0029] text-xs font-['Poppins'] font-semibold px-3 py-1 rounded-full">
                          {item.category?.name}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="w-9 h-9 flex items-center justify-center bg-[#EB0029] text-white rounded-full hover:bg-red-600 transition-colors text-xl font-light shadow-lg"
                        >
                          +
                        </button>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-base font-['Poppins'] font-semibold text-white">
                          {item.name}
                        </h3>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm font-['Poppins'] font-bold text-white/90">
                            ${item.price}
                          </p>
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="flex items-center gap-1 text-white text-xs font-['Poppins'] font-medium hover:text-white/70 transition-colors"
                          >
                            Order now
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-2">
                {foods.map(
                  (_: Food, i: number) =>
                    i % ITEMS_PER_PAGE === 0 && (
                      <button
                        key={i}
                        onClick={(): void => {
                          setCurrent(i)
                          if (scrollRef.current) {
                            scrollRef.current.scrollTo({
                              left: i * CARD_WIDTH,
                              behavior: 'smooth',
                            })
                          }
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === current ? 'w-6 bg-[#EB0029]' : 'w-2 bg-gray-200'
                        }`}
                      />
                    )
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  )
}
