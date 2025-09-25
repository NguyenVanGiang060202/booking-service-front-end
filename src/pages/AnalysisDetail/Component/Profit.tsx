import { Badge } from '@/components/ui/badge'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function Profit() {
    const [isModalProfitOpen, setIsModalProfitOpen] = React.useState(false)
    return (
        <div className='flex flex-col gap-4 justify-start items-center p-6 w-full h-fit bg-white rounded-xl border-gray-200 shadow-md'>
            <div className="w-full flex justify-between items-center">
                <div className="flex flex-col justify-start items-start w-full font-bolds">
                    <p className='text-xl font-bold'>Profit</p>
                    <div className="flex gap-2 justify-center items-center">
                        <p className='text-3xl font-bold'>3/5</p>
                        <Badge className='text-lg bg-green-200 rounded-2xl text-slate-900' variant="default">Excellent</Badge>
                    </div>
                </div>
                <Button onClick={() => setIsModalProfitOpen(!isModalProfitOpen)} className='size-14' variant='ghost'><ChevronDown className='size-full' size={56} /></Button>
            </div>
            {isModalProfitOpen && (
                <div className="w-full flex justify-between items-center gap-6 h-[17rem]">
                    <div className="flex flex-col gap-4 justify-center items-center h-[17rem] rounded-lg bg-neutral-100 w-full max-w-72 border-2 border-gray-200">
                        <p className='text-xl '>Est. Profit Margin</p>
                        <p className='text-5xl font-bold'>80%</p>
                    </div>
                    <div className="w-full flex flex-col gap-4 justify-center items-center h-full rounded-lg  ">
                        <div className="w-full h-full flex justify-center px-6 items-start flex-col border-2 border-gray-200 rounded-lg">
                            <p className='text-xl '>Product cost</p>
                            <p className='text-3xl text-red-800 font-bold'>100$</p>
                        </div>
                        <div className="w-full h-full flex justify-center px-6 items-start flex-col border-2 border-gray-200 rounded-lg">
                            <p className='text-xl '>Selling Price</p>
                            <p className='text-3xl text-green-800 font-bold'>100$</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-4 justify-center items-center h-full rounded-lg  ">
                        <div className="w-full h-full flex justify-center px-6 items-start flex-col border-2 border-gray-200 rounded-lg">
                            <p className='text-xl '>Shipping cost</p>
                            <p className='text-3xl text-red-800 font-bold'>100$</p>
                        </div>
                        <div className="w-full h-full flex justify-center px-6 items-start flex-col border-2 border-gray-200 rounded-lg">
                            <p className='text-xl '>Gross Price</p>
                            <p className='text-3xl text-green-800 font-bold'>100$</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
