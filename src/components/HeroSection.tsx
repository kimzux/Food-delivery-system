import tunda from '@/assets/tunda.svg'
import food from '@/assets/food.png'
import arrow from '@/assets/arrow.svg'
import box from '@/assets/box.svg'
import youtube from '@/assets/youtube.png'
import CustomerAvatars from './CustomerAvatars'

export default function HeroSection() {
  return (
    <section id="why-foodeli" className="mt-8">
      <div className="flex flex-col lg:flex-row items-start gap-8">
        <div className="w-full lg:w-1/2 lg:mt-8">
          <button className="bg-[#FEE9DE] p-2 rounded-full focus:outline-none mb-4">
            <div className="flex gap-3 mx-2 px-2 items-center">
              <span className="text-sm text-[#EB0029]">more than faster</span>
              <img src={tunda} alt="tunda" className="h-5 w-5" />
            </div>
          </button>

          <div className="mt-5 lg:mt-10">
            <h1 className="text-3xl font-bold lg:text-5xl xl:text-7xl md:text-5xl ">
              Claim Best Offer on Fast{' '}
              <span className="text-red-500 font-['Lobster_Two']">food</span>
              <span className="font-['Rubik']"> & </span>
              <span className="text-red-500 font-['Lobster_Two']">
                Restaurants
              </span>
            </h1>

            <p className="my-4 font-['Poppins'] text-base md:w-8/12">
              Our job is to filling your tummy with delicious food and with fast
              and free delivery
            </p>

            <div className="flex mt-8 items-center gap-6">
              <button className="bg-[#EB0029] text-white px-7 py-3 rounded-full hover:bg-red-600 text-sm transition-colors">
                Get Started
              </button>
              <a href="#" className="flex items-center gap-2">
                <img src={youtube} alt="YouTube" className="w-10 h-10" />
                <span className="font-['Poppins'] font-semibold">
                  Watch Video
                </span>
              </a>
            </div>

            <div className="hidden md:flex my-10">
              <CustomerAvatars />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 relative mt-2">
          <div className="relative h-64 lg:h-auto">
            <img
              src={food}
              alt="Food"
              className="w-full h-full object-contain"
            />

            {/* Decorative elements */}
            <span className="text-red-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl absolute right-4 sm:right-8 md:right-10 lg:right-12 top-4 sm:top-6 md:top-8 lg:top-5">
              🔥
            </span>

            <div className="flex items-center gap-1 sm:gap-2 absolute right-1 sm:right-4 md:right-6 lg:right-1 top-28 sm:top-24 md:top-28 lg:top-32">
              <img src={arrow} alt="Arrow" />
            </div>

            <div className="absolute top-2 left-2 p-2">
              <img
                src={box}
                alt="Box"
                className="h-20 w-20 md:h-10 md:w-10 lg:h-full lg:w-full"
              />
            </div>

            <div className="absolute top-10 -left-2 md:top-24 md:-left-10 lg:top-32 lg:-left-12.5 w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="absolute bottom-5 right-24 md:-bottom-7.5 md:right-36 w-3 h-3 bg-red-500" />
            <div className="absolute top-50 translate-y-[-50%] -right-2.5 md:-right-5 lg:-right-7.5 w-3 h-3 bg-red-500" />
          </div>
          <div className="flex mt-10 lg:hidden md:hidden">
            <CustomerAvatars />
          </div>
        </div>
      </div>
    </section>
  )
}
