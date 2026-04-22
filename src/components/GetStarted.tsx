import GetstartedImage from '@/assets/app.png'

export default function GetStarted() {
  return (
    <section
      id="get-started"
      className="py-2 flex flex-col justify-center items-center"
    >
      <img
        src={GetstartedImage}
        alt="Get Started"
        className="w-full h-auto object-cover"
      />
    </section>
  )
}
