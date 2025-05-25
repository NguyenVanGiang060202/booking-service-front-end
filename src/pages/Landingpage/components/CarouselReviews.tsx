
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"
export default function CarouselReviews() {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])
    return (
        <div className="w-full h-full justify-start items-start">
            <div className=" flex justify-between items-center w-full h-full">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full h-full "
                    setApi={setApi}
                    plugins={[
                        Autoplay({
                            delay: 3000,
                        }),
                    ]}
                >
                    <CarouselContent className="">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 xl:basis-1/3 h-1/2">
                                <div className="p-1">
                                    <Card className="">
                                        <CardContent className="grid relative aspect-video items-center justify-around px-8 w-full h-fit">
                                            <div className="flex space-x-8 w-full h-fit">
                                                <div className="h-full w-full flex flex-col justify-around items-start space-y-2 rounded-2xl">
                                                    <div className="flex justify-center items-center md:space-x-2 space-x-1">
                                                        {Array.from({ length: 5 }).map(() => (
                                                            <Star fill="orange" color="orange" className="xl:size-6 lg:size-4 size-3 "/>
                                                        ))}
                                                    </div>
                                                    <h5 className="font-bold text-lg">Best service!</h5>
                                                    <p className="text-slate-600 line-clamp-3 lg:text-base text-sm">This beauty services website is my go-to for all my beauty needs. The staff is friendly and professional.</p>
                                                    <div className="flex justify-center items-center space-x-4 ">
                                                        <img src="/img/DummyImage.png" className="lg:size-12 size-8 object-cover aspect-square rounded-full"></img>
                                                        <div className="flex justify-center items-start flex-col">
                                                            <h6 className="font-bold lg:text-lg text-base">Lucy Rodriguez</h6>
                                                            <p className="text-base sm:text-sm">24 march</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {current > 1 ? <CarouselPrevious /> : ""}
                    {current < count ? <CarouselNext /> : ""}
                </Carousel>
            </div>
        </div>
    )
}
