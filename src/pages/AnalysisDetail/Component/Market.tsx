import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { ChevronDown, TrendingUp } from 'lucide-react'
import React from 'react'
import { Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, XAxis, YAxis } from 'recharts'

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

const CustomLegend = () => {
    return (
        <div className="flex gap-4 justify-end">
            {/* Item 1 - Gradient */}
            <div className="flex gap-2 items-center px-2 py-1 bg-gray-100 rounded">
                <div
                    className="w-4 h-4 rounded"
                    style={{
                        background: "linear-gradient(to bottom, #3498db, #9b59b6)"
                    }}
                ></div>
                <span className='text-lg'>Unit sold</span>
            </div>

            {/* Item 2 - Solid color */}
            <div className="flex gap-2 items-center px-2 py-1 bg-gray-100 rounded">
                <div className="w-4 h-4 bg-blue-300 rounded"></div>
                <span className='text-lg'>Total sales</span>
            </div>
        </div>
    );
};

export default function Market() {
    const [isModalMarketOpen, setIsModalMarketOpen] = React.useState(false)
    return (
        <div className='flex flex-col gap-4 justify-start items-center p-6 w-full bg-white rounded-xl border-gray-200 shadow-md h-fit'>
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col justify-start items-start w-full font-bolds">
                    <p className='text-xl font-bold'>Market</p>
                    <div className="flex gap-2 justify-center items-center">
                        <p className='text-3xl font-bold'>5/5</p>
                        <Badge className='text-lg bg-green-200 rounded-2xl text-slate-900' variant="default">High volume</Badge>
                    </div>
                </div>
                <Button onClick={() => setIsModalMarketOpen(!isModalMarketOpen)} className='size-14' variant='ghost'><ChevronDown className='size-full' size={56} /></Button>
            </div>
            {isModalMarketOpen && (
                <div className="flex gap-6 justify-between items-center w-full h-full">
                    <div className="flex flex-col gap-6 justify-center items-center w-96 h-[28rem]">
                        <div className="flex flex-col justify-center items-start px-8 w-full h-full bg-gray-100 rounded-lg border-2 border-gray-200">
                            <p className='text-xl'>Sale volume</p>
                            <p className='text-5xl font-bold'>800K</p>
                        </div>
                        <div className="flex flex-col justify-center items-start px-8 w-full h-full rounded-lg border-2 border-gray-200">
                            <p className='text-xl'>Total sales</p>
                            <p className='text-3xl font-bold'>$1,5 M</p>
                        </div>
                        <div className="flex flex-col justify-center items-start px-8 w-full h-full rounded-lg border-2 border-gray-200">
                            <p className='text-xl'>Units sold</p>
                            <p className='text-3xl font-bold'>5,720</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full h-[28rem]">
                        <Card className='w-full h-full rounded-lg border-2 border-gray-200'>
                            <CardHeader>
                                <CardTitle className='text-lg font-normal underline decoration-dotted underline-offset-4 decoration-gray-200 decoration-2'>Sales over time</CardTitle>
                            </CardHeader>
                            <CardContent className='w-full h-full max-h-[20rem]'>
                                <ChartContainer config={chartConfig} className='w-full h-full'>
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
                                            tickFormatter={(value) => `$${value}`}
                                            domain={[0, 400]}
                                        />
                                        <YAxis
                                            yAxisId="right"
                                            orientation="right"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            domain={[0, 400]}
                                        />
                                        <XAxis
                                            dataKey="month"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={(value) => value.slice(0, 3)}
                                        />
                                        <Legend align='right' verticalAlign='bottom' iconType='square' content={<CustomLegend />} />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel />}
                                        />
                                        <Bar dataKey="unit_sold" yAxisId="left" fill="url(#barGradient)" radius={[5, 5, 0, 0]} barSize={16} />
                                        <Line type="monotone" yAxisId="right" dataKey="total_sales" stroke="#BAE6FD" strokeWidth={4} dot={false} />
                                    </ComposedChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}
