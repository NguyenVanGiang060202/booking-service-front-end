import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, Flag } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Label, Legend, Pie, PieChart } from 'recharts'


const chartAccessDeviceData = [
    { browser: "edge", visitors: 25, fill: "var(--color-edge)" },
    { browser: "chrome", visitors: 60, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 20, fill: "var(--color-safari)" },
]
const chartAccessDeviceConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "url(#barGradient)",
    },
    safari: {
        label: "Safari",
        color: "#BAE6FD",
    },
    edge: {
        label: "Edge",
        color: "#D946EF",
    },
}


const CustomLegend = () => {
    return <div className="flex relative flex-col w-full">
        <div className="flex gap-2 justify-between items-center px-2 py-1 rounded">
            <div className="flex gap-2 justify-start items-start">
                <div
                    className="w-4 h-4 rounded"
                    style={{
                        background: "linear-gradient(to bottom, #3498db, #9b59b6)"
                    }}
                ></div>
                <span className='text-sm'>High traffic group</span>
            </div>
            <span className="text-sm font-bold">75%</span>
        </div>
        <div className="flex gap-2 justify-between items-center px-2 py-1 rounded">
            <div className="flex gap-2 justify-start items-start">
                <div className="w-4 h-4 bg-blue-300 rounded"></div>
                <span className='text-sm'>Medium traffic group</span>
            </div>
            <span className="text-sm font-bold">25%</span>
        </div>
        <div className="flex gap-2 justify-between items-center px-2 py-1 rounded">
            <div className="flex gap-2 justify-start items-start">
                <div className="w-4 h-4 bg-fuchsia-500 rounded"></div>
                <span className='text-sm'>Medium traffic group</span>
            </div>
            <span className="text-sm font-bold">25%</span>
        </div>


    </div>
}

export default function Competition() {
    const [isModalCompetitionOpen, setIsModalCompetitionOpen] = React.useState(false)
    return (
        <div className='flex flex-col gap-4 justify-start items-center p-6 w-full bg-white rounded-xl border-gray-200 h-fit'>
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col justify-start items-start w-full font-bolds">
                    <p className='text-xl font-bold'>Competition</p>
                    <div className="flex gap-2 justify-center items-center">
                        <p className='text-3xl font-bold'>4/5</p>
                        <Badge className='text-lg bg-red-200 rounded-2xl text-slate-900' variant="default">High Competition</Badge>
                    </div>
                </div>
                <Button onClick={() => setIsModalCompetitionOpen(!isModalCompetitionOpen)} className='size-14' variant='ghost'><ChevronDown className='size-full' size={56} /></Button>
            </div>
            {isModalCompetitionOpen && (
                <div className="flex gap-6 justify-between items-start w-full h-full">
                    <div className="flex flex-col gap-6 justify-start items-center w-1/3 h-full">
                        <Card className="flex flex-col w-full h-full border-2 border-gray-200">
                            <CardHeader className="items-center pb-0">
                                <CardTitle>Access device</CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-center items-center h-full">
                                <ChartContainer
                                    config={chartAccessDeviceConfig}
                                    className="w-72 h-[22rem]"
                                >
                                    <PieChart className="">
                                        <defs>
                                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0284C7" stopOpacity={0.9} />
                                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.9} />
                                            </linearGradient>
                                        </defs>
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel />}
                                        />
                                        <Legend align='right' verticalAlign='bottom' iconType='square' content={<CustomLegend />} />
                                        <Pie
                                            data={chartAccessDeviceData}
                                            dataKey="visitors"
                                            nameKey="browser"
                                            className=""
                                            innerRadius={80}
                                            strokeWidth={5}
                                            startAngle={-200}
                                            endAngle={160}
                                            paddingAngle={1}

                                        >
                                            <Label
                                                content={({ viewBox }) => {
                                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                        return (
                                                            <text
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                textAnchor="middle"
                                                                dominantBaseline="middle"
                                                            >
                                                                <tspan
                                                                    x={viewBox.cx}
                                                                    y={viewBox.cy}
                                                                    className="text-2xl font-bold"
                                                                >
                                                                    3,957
                                                                </tspan>
                                                                <tspan
                                                                    x={viewBox.cx}
                                                                    y={(viewBox.cy || 0) + 24}
                                                                    className="fill-muted-foreground"
                                                                >
                                                                    Competitors
                                                                </tspan>
                                                            </text>
                                                        )
                                                    }
                                                }}
                                            />
                                        </Pie>
                                    </PieChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                        <div className="flex flex-col gap-4 justify-center items-start p-6 w-full h-1/3 rounded-lg border-2 border-gray-200">
                            <p>Median selling price</p>
                            <p className='text-xl font-bold'>$100</p>
                            <div className="flex justify-between items-center w-full">
                                <p>Lowest price</p>
                                <p>$50</p>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p>Highest price</p>
                                <p>$250</p>
                            </div>
                        </div>
                    </div>


                    <div className="overflow-y-auto relative w-full rounded-lg border-2 border-gray-200 h-[42rem]">
                        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Store selling
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Selling price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Est. revenue
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Monthly traffic
                                    </th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <tr key={index} className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex justify-start items-center">
                                                <img src="/img/Phone.png" alt="" className='object-contain rounded-lg aspect-square size-10' />
                                                <div className="flex flex-col">
                                                    <p className='truncate'>ABC Product name</p>
                                                    <div className="flex gap-2 items-center">
                                                        <Flag className='w-4 h-4' />
                                                        <p className='text-sm font-light text-gray-500'>Germany</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4 text-black">
                                            $55,99
                                        </td>
                                        <td className="px-6 py-4 text-black">
                                            $55,99
                                        </td>
                                        <td className="px-6 py-4 text-black">
                                            123,456
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
