import CarouselBussiness from "./components/CarouselBusiness"
import CarouselIndividuals from "./components/CarouselIndividuals"




export default function Recommends() {
  return (
    <div className="w-dvw h-full  px-40 flex justify-start items-start flex-col">
      <h2 className="text-5xl font-bold">Luminova recommends</h2>
      <CarouselBussiness />
      <CarouselIndividuals />
    </div>
  )
}
