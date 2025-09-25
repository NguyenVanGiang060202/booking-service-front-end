import { Eye, Facebook, Heart, Watch } from 'lucide-react'
import React from 'react'

export default function RelatedAds() {
    return (
        <div className='flex flex-col gap-6 justify-center items-start p-6 w-full rounded-lg border-2 border-gray-200 h-[36rem]'>
            <div className="w-full text-xl font-bold">Related Ads</div>
            <div className="flex overflow-x-scroll gap-4 justify-start items-center w-full h-full">
                {
                    Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="flex flex-col gap-2 justify-center items-center w-64 h-full rounded-lg">
                            <div className="relative w-64 h-full rounded-lg">
                                <img src="/img/adv_cosmetics.jpg" alt="" className='object-cover w-full h-full rounded-lg' />
                                <div className="flex absolute bottom-2 left-2 gap-6 justify-center items-center px-2 py-1 rounded-lg bg-gray-900/10">
                                    <div className="flex gap-1 justify-center items-center">
                                        <Heart size={20} fill='white' stroke='none' />
                                        <p className='text-sm text-white'>123</p>
                                    </div>
                                    <div className="flex gap-1 justify-center items-center">
                                        <Eye size={20} stroke='white' />
                                        <p className='text-sm text-white'>456K</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center w-full">
                                <div className="flex gap-2 justify-start items-center w-full">
                                    <div className="rounded-sm bg-neutral-600">
                                        <Facebook size={20} fill='white' stroke='none' />
                                    </div>
                                    <p>Ads title</p>
                                </div>
                                <p className='w-full'>Added on 24 Mar 2025</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
