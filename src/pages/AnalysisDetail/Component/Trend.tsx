import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, Triangle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, XAxis, YAxis } from 'recharts'
import { Link } from 'react-router-dom'



const chartData = [
    { month: "Jan", unit_sold: 50, total_sales: 120 },
    { month: "Feb", unit_sold: 125, total_sales: 200 },
    { month: "Mar", unit_sold: 190, total_sales: 160 },
    { month: "Apr", unit_sold: 20, total_sales: 305 },
    { month: "May", unit_sold: 90, total_sales: 150 },
    { month: "Jun", unit_sold: 10, total_sales: 105 },
    { month: "Jul", unit_sold: 205, total_sales: 140 },
    { month: "Aug", unit_sold: 90, total_sales: 90 },
    { month: "Sep", unit_sold: 50, total_sales: 120 },
    { month: "Oct", unit_sold: 215, total_sales: 180 },
    { month: "Nov", unit_sold: 40, total_sales: 160 },
    { month: "Dec", unit_sold: 60, total_sales: 120 },
]
const chartConfig = {
    unit_sold: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
    total_sales: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig


export default function Trend() {
    const [isModalTrendOpen, setIsModalTrendOpen] = React.useState(false)
    return (
        <div className='flex flex-col gap-4 justify-start items-center p-6 w-full bg-white rounded-xl border-gray-200 h-fit'>
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col justify-start items-start w-full font-bolds">
                    <p className='text-xl font-bold'>Trend</p>
                    <div className="flex gap-2 justify-center items-center">
                        <p className='text-3xl font-bold'>2/5</p>
                        <Badge className='text-lg bg-red-200 rounded-2xl text-slate-900' variant="default">Low Trending</Badge>
                    </div>
                </div>
                <Button onClick={() => setIsModalTrendOpen(!isModalTrendOpen)} className='size-14' variant='ghost'><ChevronDown className='size-full' size={56} /></Button>
            </div>
            {isModalTrendOpen && (
                <div className="flex flex-col gap-6 justify-between items-start w-full h-full">
                    <div className="flex gap-4 justify-start items-center">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="flex gap-2 justify-center items-center">
                                <Badge className={`text-lg rounded-2xl ${index === 0 ? 'bg-violet-200' : 'bg-gray-200'} text-slate-900`} variant="default">#keyword {index + 1}</Badge>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-4 justify-center items-center w-full h-full">
                        <div className="flex flex-col justify-center items-center w-full h-[28rem]">
                            <Card className='w-full h-full rounded-lg border-2 border-gray-200 shadow-none'>
                                <CardHeader>
                                    <CardTitle className='font-normal'>Search Volume</CardTitle>
                                    <CardDescription className='text-2xl font-bold text-black'>100K</CardDescription>
                                </CardHeader>
                                <CardContent className='w-full h-full max-h-[20rem]'>
                                    <ChartContainer config={chartConfig} className='w-full h-[calc(100%-1rem)]'>
                                        <ComposedChart accessibilityLayer data={chartData} className='w-full h-full'>
                                            <defs>
                                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#0284C7" stopOpacity={0.9} />
                                                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.9} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid vertical={false} />
                                            <YAxis
                                                yAxisId="left"
                                                orientation="left"
                                                tickLine={false}
                                                tickMargin={10}
                                                axisLine={false}
                                                domain={[0, 400]}
                                                label={{ value: 'Search volume', angle: -90, position: 'insideLeft', textAnchor: 'middle', className: 'text-base' }}
                                            />

                                            <XAxis
                                                dataKey="month"
                                                tickLine={false}
                                                tickMargin={10}
                                                axisLine={false}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <ChartTooltip
                                                cursor={false}
                                                content={<ChartTooltipContent hideLabel />}
                                            />
                                            <Line type="monotone" yAxisId="left" dataKey="total_sales" stroke="#BAE6FD" strokeWidth={4} dot={false} />
                                        </ComposedChart>
                                    </ChartContainer>
                                    <div className="flex justify-start items-center p-1 px-4 w-full bg-gray-100 rounded-lg">
                                        <div className="flex gap-6 justify-start items-center">
                                            <div className="flex gap-2 justify-start items-center">
                                                <Triangle className='size-4' fill="#22c55e" stroke='none' />
                                                <p className='text-green-500'>High season: </p>
                                                <div className=''>Jan 08, 2025 | <span className='font-bold'>590</span></div>
                                            </div>
                                            <div className="flex gap-2 justify-start items-center">
                                                <Triangle className='rotate-180 size-4' fill="#ef4444" stroke='none' />
                                                <p className='text-red-500'>Low season: </p>
                                                <div className=''>Jan 08, 2025 | <span className='font-bold'>50</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="flex flex-col gap-6 justify-center items-start p-6 w-1/3 rounded-lg border-2 border-gray-200 h-[28rem]">
                            <div className="flex justify-between items-center w-full">
                                <p className='underline decoration-dotted underline-offset-4 decoration-gray-200 decoration-2'>Related queries</p>
                                <Link to="#" className='font-bold text-blue-500 hover:underline'>View (+99) results</Link>
                            </div>
                            <div className="flex flex-col gap-2 justify-between items-start w-full h-full">
                                <div className="flex gap-4 justify-between items-start w-full">
                                    <p className=''>Where to buy hp mini printer inpuerto rico?</p>
                                    <p className=''>12.000</p>
                                </div>
                                <div className="flex gap-4 justify-between items-start w-full">
                                    <p className=''>Where to buy hp mini printer inpuerto rico?</p>
                                    <p className=''>100</p>
                                </div>
                                <div className="flex gap-4 justify-between items-start w-full">
                                    <p className=''>Where to buy hp mini printer inpuerto rico?</p>
                                    <p className=''>200</p>
                                </div>
                                <div className="flex gap-4 justify-between items-start w-full">
                                    <p className=''>Where to buy hp?</p>
                                    <p className=''>300</p>
                                </div>
                                <div className="flex gap-4 justify-between items-start w-full">
                                    <p className=''>Where to buy hp mini printer inpuerto rico?</p>
                                    <p className=''>300</p>
                                </div>
                                <div className="flex gap-4 justify-between items-start w-full">
                                    <p className=''>Where to buy hp?</p>
                                    <p className=''>300</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}
