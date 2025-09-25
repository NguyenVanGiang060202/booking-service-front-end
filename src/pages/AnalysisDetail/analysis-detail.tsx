import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import ProductOverview from './Component/ProductOverview'
import Profit from './Component/Profit'
import Market from './Component/Market'
import AdPotential from './Component/AdPotential'
import Trend from './Component/Trend'
import Competition from './Component/Competition'

export default function AnalysisDetail() {
    
    
    
    return (
        <div className='flex flex-col gap-2 justify-start items-center w-full h-full max-w-screen bg-neutral-200'>
            <div className="flex justify-between items-center px-8 w-full h-24 bg-white">
                <div className="flex gap-2 justify-center items-center">
                    <ArrowLeft />
                    <h3 className='text-2xl font-bold'>Analysis detail</h3>
                </div>
                <div className="flex gap-2 justify-center items-center">
                    <Button variant='secondary'>Add to Tracking</Button>
                    <Button variant='secondary'>Add to List</Button>
                </div>
            </div>
            <div className="flex flex-col gap-6 justify-center items-center p-4 w-full h-full">
                <ProductOverview />
                <Profit />
                <Market />
                <AdPotential/>
                <Trend/>
                <Competition/>
            </div>
        </div>
    )
}
