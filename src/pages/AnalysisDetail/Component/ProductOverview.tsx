import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"

const chartData = [
    { month: "Profit margin", desktop: 300 },
    { month: "Sales volume", desktop: 380 },
    { month: "Ad potential", desktop: 240 },
    { month: "Search volume", desktop: 440 },
    { month: "After selection", desktop: 300 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#c4b5fd",
    },
} satisfies ChartConfig


export const description = "A radar chart with a grid and circle"

export default function ProductOverview() {
    return (
        <div className='flex gap-4 justify-center items-center p-6 w-full h-full max-h-[30rem] bg-white rounded-xl border-gray-200 shadow-md'>
            <div className="flex flex-col justify-center items-center h-full max-h-96 w-full max-w-1/3 rounded-lg border-2 border-gray-200 ">
                <Card className="gap-0 w-full h-96 max-h-96 border-none">
                    <CardHeader className="items-center gap-0 ">
                        <CardTitle className="text-lg font-bold text-black">Product Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="w-full h-full px-0 max-h-[21rem]">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto w-full h-full "
                        >
                            <RadarChart data={chartData} outerRadius="65%">
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <PolarGrid gridType="circle" />

                                <PolarAngleAxis
                                    dataKey="month"
                                />
                                <Radar
                                    dataKey="desktop"
                                    stroke="#8b5cf6"
                                    fill="var(--color-desktop)"
                                    fillOpacity={0.6}
                                    dot={{
                                        r: 4,
                                        fillOpacity: 1,
                                    }}
                                />
                            </RadarChart>
                        </ChartContainer>

                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col justify-start items-start p-4 w-full h-96 rounded-lg border-2 border-gray-200">
                <div className="flex flex-col gap-4 justify-start items-center w-full h-full">
                    <h4 className="w-full text-lg font-semibold">Conclusion</h4>
                    <ul role="list" className="flex flex-col gap-4 pl-2 list-disc list-inside">
                        <li className="text-lg">
                            <span className="font-bold">Holistic View: </span> Comprehensive analysis of the product's performance, including sales, customer feedback, and market trends. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                        </li>
                        <li className="text-lg">
                            <span className="font-bold">Recommendations: </span> Comprehensive analysis of the product's performance, including sales, customer feedback, and market trends. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                        </li>
                    </ul>
                </div>
                <div className="flex gap-4 justify-between items-center text-lg">
                    <p>Was this summary helpful?</p>
                    <Button className="text-black bg-white border-2 border-gray-200">Yes</Button>
                    <Button className="text-black bg-white border-2 border-gray-200">No</Button>
                </div>
            </div>
        </div>
    )
}

