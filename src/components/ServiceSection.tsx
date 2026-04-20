import foodOrder from '@/assets/foodOrder.png'
import takeAway from '@/assets/takeAway.png'
import waiters from '@/assets/Waiters.png'

const services: { image: string; title: string; description: string }[] = [
  {
    image: foodOrder,
    title: 'Easy To Order',
    description: 'You only need a few steps in ordering food.',
  },
  {
    image: takeAway,
    title: 'Fastest Delivery',
    description: 'Delivery that is always ontime even faster.',
  },
  {
    image: waiters,
    title: 'Best Quality',
    description: 'Not only fast for us quality is also number one.',
  },
]

export default function ServiceSection() {
  return (
    <section
      id="service"
      className="py-4 flex flex-col justify-center items-center"
    >
      <div className="w-full px-5 mflex flex-col justify-center items-center">
        <h2 className="text-xl font-['Poppins'] font-semibold text-center text-[#EB0029] mb-4 md:mb-8">
          What we serve
        </h2>
        <h1 className="text-center text-black text-2xl md:text-4xl lg:text-5xl font-['Rubik']">
          <span className="inline-block">Your Favourite Food</span>
          <span className="block mt-2">Delivery Partner</span>
        </h1>
      </div>

      <div className="w-full px-5  mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(
          (service: { image: string; title: string; description: string }) => (
            <div
              key={service.title}
              className="flex flex-col justify-center items-center overflow-hidden"
            >
              <img src={service.image} alt={service.title} />
              <div className="p-6">
                <h3 className="text-xl text-center font-['Poppins'] font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-center text-gray-600 font-['Poppins'] font-light">
                  {service.description}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}
