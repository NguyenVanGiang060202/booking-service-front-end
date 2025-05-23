import CarouselServices from "./components/CarouselServices";


export default function PopularServices() {
  return (
    <div className="w-dvw h-full  px-40 flex justify-start items-start flex-col space-y-8">
        <h2 className="text-6xl font-bold">Popular services in</h2>
        <CarouselServices/>
    </div>
  )
}
