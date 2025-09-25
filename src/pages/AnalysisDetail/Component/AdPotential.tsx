import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Cell, Label, Legend, Pie, PieChart } from "recharts";
import RelatedAds from "./RelatedAds";
import { useState } from "react";


const value = 80; // điểm (0 - 100)
const data = [
    { name: "low", value: 50, fill: "red" },
    { name: "medium", value: 50, fill: "orange" },
    { name: "high", value: 50, fill: "yellow" },
    { name: "very high", value: 50, fill: "green" },
];


// Tính góc kim theo value
const angle = 180 * (value / 100);


const chartAccessDeviceData = [
    { browser: "safari", visitors: 25, fill: "var(--color-safari)" },
    { browser: "chrome", visitors: 75, fill: "var(--color-chrome)" },

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
}
const CustomLegend = () => {
    return <div className="flex relative flex-col w-full">
        <div className="flex gap-2 justify-between items-center px-2 py-1 rounded">
            <div className="flex gap-2 justify-start items-start">
                <div
                    className="mt-2 w-4 h-4 rounded"
                    style={{
                        background: "linear-gradient(to bottom, #3498db, #9b59b6)"
                    }}
                ></div>
                <div className="flex flex-col justify-start items-start">
                    <span className='text-lg'>Mobile</span>
                    <span className='text-base text-gray-500'>Total clicks</span>
                </div>
            </div>
            <div className="flex flex-col justify-end items-end">
                <span className="text-lg">75%</span>
                <span className="text-base text-gray-500">6,234</span>
            </div>
        </div>
        <div className="flex gap-2 justify-between items-center px-2 py-1 rounded">
            <div className="flex gap-2 justify-start items-start">
                <div className="mt-2 w-4 h-4 bg-blue-300 rounded"></div>
                <div className="flex flex-col justify-start items-start">
                    <span className='text-lg'>Desktop</span>
                    <span className='text-base text-gray-500'>Total clicks</span>
                </div>
            </div>
            <div className="flex flex-col justify-end items-end">
                <span className="text-lg">25%</span>
                <span className="text-base text-gray-500">1,792</span>
            </div>
        </div>


    </div>
}




const percent = 52;
const totalBars = 30;
const activeBars = Math.round((percent / 100) * totalBars);



export default function AdPotential() {
    const [isModalAdsOpen, setIsModalAdsOpen] = useState(false)
    return (
        <div className="flex flex-col gap-4 justify-start items-center p-6 w-full bg-white rounded-xl border-gray-200 shadow-md h-fit">
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col justify-start items-start w-full font-bolds">
                    <p className='text-xl font-bold'>Ad Potential</p>
                    <div className="flex gap-2 justify-center items-center">
                        <p className='text-3xl font-bold'>3/5</p>
                        <Badge className='text-lg bg-green-200 rounded-2xl text-slate-900' variant="default">Excellent</Badge>
                    </div>
                </div>
                <Button onClick={() => setIsModalAdsOpen(!isModalAdsOpen)} className='size-14' variant='ghost'><ChevronDown className='size-full' size={56} /></Button>
            </div>
            {isModalAdsOpen && (
                <>
                    <div className="flex gap-6 justify-between items-center w-full h-[30rem]">
                        <div className="flex flex-col justify-center items-center w-full h-[30rem]">
                            <Card className="flex flex-col w-full h-full !p-0 !py-0 !gap-0 border-gray-200 border-2">
                                <CardContent className="h-full bg-gray-100 rounded-lg">
                                    <div className="flex justify-center w-full h-[14rem]">
                                        <ChartContainer
                                            config={chartAccessDeviceConfig}
                                            className="h-[28rem] w-[28rem]"
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

                                                <Pie
                                                    data={data}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    className=""
                                                    innerRadius={160}
                                                    strokeWidth={5}
                                                    startAngle={180}
                                                    endAngle={0}
                                                    paddingAngle={-4}
                                                    cornerRadius={10}

                                                >
                                                    <Label
                                                        content={({ viewBox }) => {
                                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                                const { cx, cy, innerRadius, outerRadius, startAngle, endAngle } = viewBox;

                                                                // giá trị hiện tại
                                                                const value = 80;
                                                                const max = 100;

                                                                // góc tương ứng với value
                                                                const angle = startAngle + (endAngle - startAngle) * (value / max);

                                                                // bán kính (dùng outerRadius để marker nằm ngoài)
                                                                const r = outerRadius - 8;

                                                                // tính tọa độ
                                                                const rad = (Math.PI / 180) * angle;
                                                                const x = cx + r * Math.cos(-rad);
                                                                const y = cy + r * Math.sin(-rad);
                                                                return (
                                                                    <>
                                                                        <text
                                                                            x={viewBox.cx}
                                                                            y={viewBox.cy}
                                                                            textAnchor="middle"
                                                                            dominantBaseline="middle"
                                                                        >
                                                                            <tspan
                                                                                x={viewBox.cx}
                                                                                y={viewBox.cy - 80}
                                                                                className="text-xl"
                                                                            >
                                                                                Ads potential
                                                                            </tspan>
                                                                            <tspan
                                                                                x={viewBox.cx}
                                                                                y={(viewBox.cy || 0) - 30}
                                                                                className="text-2xl font-semibold"
                                                                            >
                                                                                <tspan className="text-4xl font-bold">80</tspan>/100
                                                                            </tspan>
                                                                        </text>
                                                                        <circle cx={x} cy={y} r={10} fill="green" stroke="white" strokeWidth={3} />
                                                                    </>
                                                                )
                                                            }
                                                        }}
                                                    />
                                                </Pie>
                                            </PieChart>
                                        </ChartContainer>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 px-8 w-full h-1/2">
                                    <div className="flex flex-col justify-center items-center w-full h-full">
                                        <p className='w-full text-xl font-bold underline decoration-dotted underline-offset-4 decoration-gray-200 decoration-2'>PPC data</p>
                                        <div className="flex justify-between items-center w-full">
                                            <p className=''>Est. monthly cost</p>
                                            <p className='font-bold'>$120 ($0.25 CPC)</p>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <p className=''>Advertisers</p>
                                            <p className='font-bold'>123,435</p>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <p className=''>Homepages results</p>
                                            <p className='font-bold'>123</p>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                        <div className="flex flex-col gap-4 justify-center items-center w-2/3 h-[30rem]">
                            <div className="flex flex-col gap-2 justify-center items-start p-4 px-8 w-full rounded-lg border-2 border-gray-200">
                                <p className='text-lg font-normal underline decoration-dotted underline-offset-4 decoration-gray-200 decoration-2'>Estimated clicks</p>
                                <div className="flex flex-col justify-center items-start">
                                    <p className='text-3xl font-bold'>1,100</p>
                                    <p className='flex gap-1 text-lg'>
                                        <span className='font-bold'>47/100</span>
                                        <span className='text-gray-500'>difficulty</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center w-full">
                                <div className="flex flex-col gap-2 justify-center items-start p-4 px-8 w-full rounded-t-lg border-2 border-gray-200">
                                    <p className=''>Click prediction</p>
                                    <div className="flex flex-col items-center w-full">
                                        {/* Thanh cột */}
                                        <div className="flex relative gap-1 items-end h-16">
                                            {Array.from({ length: totalBars }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-[3px] h-6  relative rounded-full ${i < activeBars
                                                        ? "bg-gradient-to-t from-purple-500 to-blue-600"
                                                        : "bg-gray-300"
                                                        } ${i === activeBars - 1 && "h-10 bg-gradient-to-t from-purple-500 to-blue-600"}`}
                                                >
                                                    {i === activeBars - 1 && (
                                                        <span className="absolute -top-6 left-1/2 text-lg font-bold text-blue-600 -translate-x-1/2">
                                                            {percent}%
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        {/* Labels phía dưới */}
                                        <div className="flex justify-between mt-3 w-full text-sm text-gray-600">
                                            <span>Low</span>
                                            <span>Medium</span>
                                            <span>High</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 justify-center items-start p-4 px-8 w-full rounded-b-lg border-2 border-t-0 border-gray-200">
                                    <p className=''>Paid clicks</p>
                                    <div className="flex flex-col items-center w-full">
                                        {/* Thanh cột */}
                                        <div className="flex relative gap-1 items-end h-16">
                                            {Array.from({ length: totalBars }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-[3px] h-6  relative rounded-full ${i < activeBars
                                                        ? "bg-gradient-to-t from-purple-500 to-blue-600"
                                                        : "bg-gray-300"
                                                        } ${i === activeBars - 1 && "h-10 bg-gradient-to-t from-purple-500 to-blue-600"}`}
                                                >
                                                    {i === activeBars - 1 && (
                                                        <span className="absolute -top-6 left-1/2 text-lg font-bold text-blue-600 -translate-x-1/2">
                                                            {percent}%
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        {/* Labels phía dưới */}
                                        <div className="flex justify-between mt-3 w-full text-sm text-gray-600">
                                            <span>Low</span>
                                            <span>Medium</span>
                                            <span>High</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center w-2/3 h-[30rem]">
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
                                                innerRadius={65}
                                                strokeWidth={5}
                                                startAngle={90}
                                                endAngle={450}
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
                                                                        className="text-2xl fill-foreground"
                                                                    >
                                                                        3,957
                                                                    </tspan>
                                                                    <tspan
                                                                        x={viewBox.cx}
                                                                        y={(viewBox.cy || 0) + 24}
                                                                        className="fill-muted-foreground"
                                                                    >
                                                                        Total clicks
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
                        </div>
                    </div>
                    <RelatedAds />
                </>
            )}
        </div>
    )
}
