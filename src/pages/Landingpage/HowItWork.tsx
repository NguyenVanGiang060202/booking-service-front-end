import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star } from "lucide-react";
import { motion } from "motion/react";


const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1, // hiệu ứng delay giữa các phần tử con
        },
    },
};

const childVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function () {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }} className="w-dvw h-full flex justify-center items-center flex-col md:p-20 lg:p-40 p-10 lg:py-10">
            <motion.div variants={childVariants} className="flex justify-center items-center flex-col space-y-10">
                <motion.h3 variants={childVariants} className="font-bold text-2xl text-teal-900">How it work?</motion.h3>
                <motion.h2 variants={childVariants} className="text-4xl lg:text-6xl font-bold">A simple way to beauty and health</motion.h2>
            </motion.div>
            <motion.div
                className=" w-full h-full grid lg:grid-cols-3 lg:grid-rows-1 grid-cols-1 grid-rows-3 justify-center items-center place-items-center lg:gap-2 xl:gap-10">
                <motion.div variants={childVariants} className="lg:w-full w-fit bg-blue-50 shadow-xl h-2/3 p-4 rounded-2xl space-y-10 ">
                    <div className="w-full h-full justify-center items-center flex-col grid grid-row-3 lg:space-y-10 space-y-4">
                        <div className="relative flex w-full h-full justify-center items-center">
                            <Search className="absolute left-4 " />
                            <Input disabled placeholder="Women's haircut" type="text" className="w-full h-1/2 px-12" />
                        </div>
                        <div className="flex justify-center items-center lg:space-x-4 space-x-2">
                            <img src="/img/hair_factory.jpg" className="lg:size-20 size-16 object-cover aspect-square rounded-2xl"></img>
                            <div className="flex justify-center items-start flex-col">
                                <div className="flex justify-center items-center">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <Star key={index} fill="orange" color="orange" />
                                    ))}
                                </div>
                                <span className="font-bold">Beauty studio</span>
                                <div className="mx-auto w-full max-w-sm rounded-md ">
                                    <div className="flex animate-pulse space-x-4">
                                        <div className="flex-1 space-y-6 py-1">
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="col-span-3 h-2 rounded bg-gray-200"></div>
                                                </div>
                                                <div className="h-2 rounded bg-gray-200"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center lg:space-x-4 space-x-2">
                            <img src="/img/nail_studio.jpg" className="lg:size-20 size-16 object-cover aspect-square rounded-2xl"></img>
                            <div className="flex justify-center items-start flex-col">
                                <div className="flex justify-center items-center">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <Star key={index} fill="orange" color="orange" />
                                    ))}
                                </div>
                                <span className="font-bold">Hair Factory</span>
                                <div className="mx-auto w-full max-w-sm rounded-md ">
                                    <div className="flex animate-pulse space-x-4">
                                        <div className="flex-1 space-y-6 py-1">
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="col-span-3 h-2 rounded bg-gray-200"></div>
                                                </div>
                                                <div className="h-2 rounded bg-gray-200"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2 flex justify-start items-start flex-col w-full ">
                        <h3 className="font-bold lg:text-xl text-lg xl:text-3xl">Find</h3>
                        <span className="xl:text-lg lg:text-lg text-base">Choose a individual or salon nearby for reviews and ratings</span>
                    </div>
                </motion.div>
                <motion.div variants={childVariants} className="lg:w-full md:w-2/3 h-2/3 space-y-10 bg-blue-50 shadow-xl p-4 rounded-2xl mt-20">
                    <div className="w-full h-full justify-center items-start rounded-2xl flex space-y-4 flex-col">
                        <h5 className="font-bold lg:text-xl text-lg xl:text-3xl">Booking</h5>
                        <div className="flex justify-center items-center w-full h-full space-x-2">
                            <div className="flex justify-center items-center w-full h-full space-x-2">
                                <img src="/img/hair_factory.jpg" className="xl:size-16 size-10 object-cover aspect-square rounded-2xl"></img>
                                <div className="flex justify-center items-start flex-col w-full h-full">
                                    <div className="mx-auto w-full max-w-sm rounded-md ">
                                        <div className="flex animate-pulse space-x-4">
                                            <div className="flex-1 space-y-6 py-1">
                                                <div className="space-y-3">
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="col-span-3 h-2 rounded bg-gray-200"></div>
                                                    </div>
                                                    <div className="h-2 rounded bg-gray-200"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center w-full h-full space-x-2">
                                <img src="/img/nail_studio.jpg" className="size-10 xl:size-16 object-cover aspect-square rounded-2xl"></img>
                                <div className="flex justify-center items-start flex-col w-full h-full">
                                    <div className="mx-auto w-full max-w-sm rounded-md ">
                                        <div className="flex animate-pulse space-x-4">
                                            <div className="flex-1 space-y-6 py-1">
                                                <div className="space-y-3">
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="col-span-3 h-2 rounded bg-gray-200"></div>
                                                    </div>
                                                    <div className="h-2 rounded bg-gray-200"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" flex justify-center items-start flex-col bg-teal-100 p-6 rounded-2xl w-full xl:h-full">
                            <h6 className="font-bold xl:text-vb lg:text-base">Women's haircut</h6>
                            <p className="xl:text-lg lg:text-base">Mon, June 27, 11:30 - 13:30</p>
                        </div>
                        <Button className="text-teal-900 w-full " variant="outline">Reserve</Button>
                    </div>
                    <div className="space-y-2 flex justify-start items-start flex-col">
                        <h3 className="font-bold lg:text-xl text-lg xl:text-3xl">Booking</h3>
                        <span className="xl:text-lg lg:text-lg text-base">At a convenient time and in just a few clicks</span>
                    </div>
                </motion.div>
                <motion.div variants={childVariants} className="lg:w-full md:w-2/3 h-2/3 space-y-10 bg-blue-50 shadow-xl p-4 rounded-2xl mt-40">
                    <div className="w-full h-full justify-center items-center rounded-2xl">
                        <img src="/img/howitwork_image.jpg" className="w-full h-full object-cover aspect-square rounded-2xl "></img>
                    </div>

                    <div className="space-y-2 flex justify-start items-start flex-col">
                        <h3 className="font-bold lg:text-xl text-lg xl:text-3xl">Enjoy</h3>
                        <span className="xl:text-lg lg:text-lg text-base">Get the best services from professionals</span>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div >
    )
}
