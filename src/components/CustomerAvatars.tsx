import p1 from '@/assets/p1.png'
import p2 from '@/assets/p2.png'
import p3 from '@/assets/p3.png'

export default function CustomerAvatars() {
  return (
    <div className="flex items-center">
      <div className="relative w-20 h-20">
        <img
          src={p1}
          alt="Customer 1"
          className="rounded-full w-full h-full border-4 border-white shadow-lg"
        />
      </div>
      <div className="relative w-20 h-20 -ml-8">
        <img
          src={p2}
          alt="Customer 2"
          className="rounded-full w-full h-full border-4 border-white shadow-lg"
        />
      </div>
      <div className="relative w-20 h-20 -ml-8">
        <img
          src={p3}
          alt="Customer 3"
          className="rounded-full w-full h-full border-4 border-white shadow-lg"
        />
      </div>
      <div className="flex flex-col mt-5 mx-2">
        <span className="text-sm">Our Happy Customer</span>
        <div className="text-sm">
          ⭐️ 4.8 <span className="text-gray-400">(12.5k Review)</span>
        </div>
      </div>
    </div>
  )
}
