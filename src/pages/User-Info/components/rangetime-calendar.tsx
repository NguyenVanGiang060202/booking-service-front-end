import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { cn } from '@/lib/utils';


type TimeUnit = 'hour' | 'minute';
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
const MONTHS_SHORT = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const WEEK_DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];


export default function RangeTimeCalendar() {

    const today = dayjs()
    const [currentDate, setCurrentDate] = useState(today);
    const [DateRange, setDateRange] = useState<{
        startDate: dayjs.Dayjs | null;
        endDate: dayjs.Dayjs | null;

    }>({ startDate: currentDate, endDate: currentDate });
    const [time, setTime] = useState(today);
    const [open, SetOpen] = useState('day')


    const days: dayjs.Dayjs[] = [];


    const isInRange = (day: dayjs.Dayjs) => {
        if (DateRange.startDate && DateRange.endDate) {
            return day.isAfter(DateRange.startDate, "day") && day.isBefore(DateRange.endDate, "day");
        }
        return false;
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        if (direction == 'prev') {
            setCurrentDate(currentDate.subtract(1, "month"))
        } else {
            setCurrentDate(currentDate.add(1, "month"))
        }
    };

    const navigateYear = (direction: 'prev' | 'next') => {
        if (direction == 'prev') {
            setCurrentDate(currentDate.subtract(1, "year"))
        } else {
            setCurrentDate(currentDate.add(1, "year"))

        };
    }

    const navigate12Year = (direction: 'prev' | 'next') => {
        if (direction == 'prev') {
            setCurrentDate(currentDate.subtract(12, "year"))
        } else {
            setCurrentDate(currentDate.add(12, "year"))

        };
    }

    const handleSelectDate = (date: dayjs.Dayjs) => {


        const startDate = DateRange.startDate;
        const endDate = DateRange.endDate;
        const target = date;

        const diff1 = Math.abs(startDate.diff(target, "day"));
        const diff2 = Math.abs(endDate.diff(target, "day"));

        if (diff1 < diff2 && diff1 != 0) {
            setDateRange({ startDate: date, endDate: DateRange.endDate })
        } else if (diff1 > diff2 && diff2 != 0) {
            setDateRange({ startDate: DateRange.startDate, endDate: date })
        } else {
            if(diff1 === 0 || diff2 === 0){
                if (date.isSame(startDate, 'day')) {
                    setDateRange((prev) => ({
                        startDate: prev.startDate,
                        endDate: date
                    }))
                }
                else{
                    setDateRange((prev) => ({
                        startDate: date,
                        endDate: prev.endDate
                    }))
                }
            }
            else{
                if(date.isBefore(startDate)){
                    setDateRange((prev) => ({
                        startDate: date,
                        endDate: prev.endDate
                    }))
                }
                else{
                    setDateRange((prev) => ({
                        startDate: prev.startDate,
                        endDate: date
                    }))
                }
            }
        }
    };

    const handleSelectMonth = (month: number) => {
        setCurrentDate(currentDate.set("month", month))

    }

    const renderCalendarDays = () => {
        const startOfMonth = currentDate.startOf("month").startOf("week");

        const endOfMonth = currentDate.endOf("month").endOf("week");

        let d = startOfMonth;
        while (d.isBefore(endOfMonth)) {
            days.push(d);
            d = d.add(1, "day");
        }

        return <>
            {days.map(day => {
                const isStartDate = day.isSame(DateRange.startDate, "day")
                const isEndDate = day.isSame(DateRange.endDate, "day")
                const isRange = isInRange(day);
                const isPreviousMonthDay = day.isBefore(currentDate.startOf("month"), "month");
                const isNextMonthDay = day.isAfter(currentDate.endOf("month"), "month");
                return (
                    <button
                        key={day.format("YYYY-MM-DD")}
                        onClick={() => {
                            if (isPreviousMonthDay) {
                                navigateMonth("prev")
                                handleSelectDate(day)
                            } else if (isNextMonthDay) {
                                navigateMonth("next")
                                handleSelectDate(day)
                            } else {
                                handleSelectDate(day)
                            }
                        }}
                        className={cn(
                            "text-sm transition-colors rounded-full aspect-square relative", 
                            {
                                "bg-yellow-900 text-white rounded-r-4xl": isStartDate,
                                "bg-yellow-900 text-white rounded-l-4xl": isEndDate,
                                "bg-yellow-400 !text-white rounded-none": isRange,
                                "text-black hover:bg-yellow-200": !isStartDate && !isEndDate && !isRange && !day.isSame(DateRange.startDate, "day"),
                                "text-gray-400": isPreviousMonthDay || isNextMonthDay
                            }
                        )}

                    >
                        {day.date()}
                    </button >
                )
            }
            )}
        </>;
    };

    const renderCalendarMonths = () => {
        return MONTHS_SHORT.map((month, index) => (
            <button
                key={month}
                onClick={() => {
                    handleSelectMonth(index)
                }}
                className={`p-2 px-4 text-lg font-medium text-black rounded-full transition-colors ${currentDate.month() === index ? 'bg-amber-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
                {month}
            </button>
        ))
    }

    const renderCalendarYear = () => {
        const years = Array.from({ length: 12 }, (_, index) => currentDate.year() - index);
        return years.map(year => (
            <button
                key={year}
                onClick={() => {
                    setCurrentDate(currentDate.set('year', year))
                    handleOpen('day')
                }}
                className="p-1 rounded-lg transition-colors hover:bg-gray-100"
            >
                {year}
            </button>
        ))
    }

    const generateTimeOptions = (max: number, selected: number, type: TimeUnit) => {
        const options = [];
        for (let i = 0; i < max; i++) {
            const isSelected = i === selected;
            options.push(
                <button
                    key={i}
                    onClick={() => setTime(time.set(type, i))}
                    className={`size-full p-1 aspect-square !rounded-full text-sm transition-colors ${isSelected
                        ? 'bg-amber-600 text-white font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    {i.toString().padStart(2, '0')}
                </button>
            );
        }
        return options;
    };

    const handleOpen = (value: string) => {
        SetOpen(value)
        console.log(value)
    }

    const handleConfirm = () => {
        SetOpen('day')
    };

    const handleCancel = () => {
        setDateRange({ startDate: today, endDate: today })
        setCurrentDate(today)
        SetOpen('day')
    }

    return (
        <div className="flex z-50 justify-center items-center p-4 w-[40rem]">
            <div className="overflow-hidden w-full max-w-md bg-white rounded-2xl shadow-2xl">
                <div className="grid grid-cols-3 h-full max-h-[24rem]">
                    {open === 'day' && (
                        <div className="flex flex-col col-span-2 justify-start items-start p-4 w-full h-full border-r-2 border-b-2">
                            {/* Calendar Header */}
                            <div className="flex justify-between items-center w-full h-20">
                                <button
                                    onClick={() => navigateMonth('prev')}
                                    className="p-2 rounded-lg shadow-sm transition-colors hover:bg-gray-100 size-fit"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button onClick={() => handleOpen('month')} className="text-lg font-medium text-gray-800">
                                    {currentDate.format('MMMM YYYY')}
                                </button>
                                <button
                                    onClick={() => navigateMonth('next')}
                                    className="p-2 rounded-lg shadow-sm transition-colors hover:bg-gray-100 size-fit"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex w-full h-full">
                                {/* Calendar */}
                                <div className="flex flex-col w-full h-full">
                                    {/* Week days header */}
                                    <div className="grid grid-cols-7 gap-1 mb-2">
                                        {WEEK_DAYS.map(day => (
                                            <div key={day} className="py-2 text-xs font-medium text-center text-gray-500">
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Calendar grid */}
                                    <div className="grid grid-cols-7 h-full">
                                        {renderCalendarDays()}
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                    {open === 'month' && (
                        <div className="flex flex-col col-span-2 justify-start items-start p-4 w-full h-full border-r-2 border-b-2">
                            {/* Calendar Header */}
                            <div className="flex justify-between items-center w-full h-20">
                                <button
                                    onClick={() => navigateYear('prev')}
                                    className="p-2 rounded-lg shadow-sm transition-colors hover:bg-gray-100 size-fit"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button onClick={() => handleOpen('year')} className="text-lg font-medium text-gray-800">
                                    {currentDate.year()}
                                </button>
                                <button
                                    onClick={() => navigateYear('next')}
                                    className="p-2 rounded-lg shadow-sm transition-colors hover:bg-gray-100 size-fit"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex w-full h-full">

                                <div className="flex-1">

                                    <div className="grid grid-cols-3 grid-rows-4 gap-4">
                                        {renderCalendarMonths()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {open === 'year' && (
                        <div className="flex flex-col col-span-2 justify-start items-start p-4 w-full h-full border-r-2 border-b-2">
                            {/* Calendar Header */}
                            <div className="flex justify-between items-center w-full h-20">
                                <button
                                    onClick={() => navigate12Year('prev')}
                                    className="p-2 rounded-lg shadow-sm transition-colors hover:bg-gray-100 size-fit"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button onClick={() => handleOpen('day')} className="text-lg font-medium text-gray-800">
                                    {currentDate.year() - 11} - {currentDate.year()}
                                </button>
                                <button
                                    onClick={() => navigate12Year('next')}
                                    className="p-2 rounded-lg shadow-sm transition-colors hover:bg-gray-100 size-fit"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex w-full h-full">
                                {/* Calendar */}
                                <div className="flex-1">
                                    {/* Calendar grid */}
                                    <div className="grid grid-cols-3 grid-rows-4 gap-4">
                                        {renderCalendarYear()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Time Picker */}
                    <div className="overflow-hidden col-span-1 h-full border-b-2 max-h-[24rem]">
                        <div className="flex justify-between w-full h-full">
                            <div className="w-full h-full text-center">
                                <div className="text-sm font-medium text-gray-700">Hour</div>
                                <div className="overflow-y-scroll mb-4 w-full h-full rounded-lg max-h-[20rem]">
                                    <div className="p-1">
                                        {generateTimeOptions(24, time.hour(), 'hour')}
                                    </div>
                                </div>
                            </div>
                            <div className="ml-2 w-full h-full text-center">
                                <div className="text-sm font-medium text-gray-700">Minute</div>
                                <div className="overflow-y-scroll mb-4 w-full h-full rounded-lg max-h-[20rem]">
                                    <div className="p-1">
                                        {generateTimeOptions(60, time.minute(), 'minute')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-end items-center p-4 w-full border-b-2">
                        <div className="flex gap-4 w-2/3">
                            <button
                                onClick={handleCancel}
                                className="p-1 px-6 w-full font-medium text-gray-600 rounded-md border border-gray-300 transition-colors hover:bg-gray-50"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="p-1 px-6 w-full font-medium text-gray-800 bg-yellow-400 rounded-md transition-colors hover:bg-yellow-500"
                            >
                                Chọn
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-center w-full">
                        <div>Start Date: {DateRange.startDate.date()} - {MONTHS[DateRange.startDate.month()]} - {DateRange.startDate.year()}</div>
                        {DateRange.endDate && <div>End Date: {DateRange.endDate.date()} - {MONTHS[DateRange.endDate.month()]} - {DateRange.endDate.year()}</div>}
                        <div>Time: {time.hour()}h - {time.minute()}m</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
