// import React from 'react'

// export default function StartDatePicker() {

//     const today = dayjs()
//     const [currentDate, setCurrentDate] = useState(today);
//     const [tempDate, setTempDate] = useState(today);
//     const [open, SetOpen] = useState('day')

//     const months = [
//         'January', 'February', 'March', 'April', 'May', 'June',
//         'July', 'August', 'September', 'October', 'November', 'December'
//     ];
//     const monthsShort = [
//         'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ];

//     const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

//     const getFirstDayOfMonth = () => {
//         const firstDay = tempDate.day()
//         return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday (0) to 6, Monday (1) to 0, etc.
//     };

//     const navigateMonth = (direction: 'prev' | 'next') => {
//         setTempDate(prev => {
//             if (direction === 'prev') {
//                 prev = prev.subtract(1, 'month')
//             } else {
//                 prev = prev.add(1, 'month')
//             }
//             return prev;
//         });
//     };

//     const navigateYear = (direction: 'prev' | 'next') => {
//         setTempDate(prev => {
//             if (direction === 'prev') {
//                 prev = prev.subtract(10, 'year')
//             } else {
//                 prev = prev.add(10, 'year')
//             }
//             return prev;
//         });

//     };

//     const renderCalendarDays = () => {
//         const daysInMonth = tempDate.daysInMonth()
//         const firstDay = getFirstDayOfMonth();
//         const days = [];

//         // Previous month's trailing days
//         const prevMonth = tempDate.subtract(1, 'month')
//         const prevMonthDays = prevMonth.date();

//         for (let i = firstDay - 1; i >= 0; i--) {
//             days.push(
//                 <button
//                     key={`prev-${prevMonthDays - i}`}
//                     onClick={() => navigateMonth('prev')}
//                     className="w-8 h-8 text-sm text-gray-400 hover:bg-gray-100 rounded transition-colors"
//                 >
//                     {prevMonthDays - i}
//                 </button>
//             );
//         }

//         // Current month's days
//         for (let day = 1; day <= daysInMonth; day++) {
//             const isSelected = day === tempDate.date();
//             days.push(
//                 <button
//                     key={day}
//                     onClick={() => {
//                         setTempDate(tempDate.set('date', day))
//                     }}
//                     className={`w-8 h-8 text-sm rounded transition-colors ${isSelected
//                         ? 'bg-amber-600 text-white font-medium'
//                         : 'text-gray-800 hover:bg-gray-100'
//                         }`}
//                 >
//                     {day}
//                 </button>
//             );
//         }

//         // Next month's leading days
//         const totalCells = 42; // 6 rows × 7 days
//         const remainingCells = totalCells - days.length;

//         for (let day = 1; day <= remainingCells; day++) {
//             days.push(
//                 <button
//                     key={`next-${day}`}
//                     onClick={() => navigateMonth('next')}
//                     className="w-8 h-8 text-sm text-gray-400 hover:bg-gray-100 rounded transition-colors"
//                 >
//                     {day}
//                 </button>
//             );
//         }

//         return days;
//     };

//     const renderCalendarMonths = () => {
//         return monthsShort.map((month, index) => (
//             <button
//                 key={month}
//                 onClick={() => {
//                     setTempDate(tempDate.set('month', index))
//                 }}
//                 className={`${tempDate.month() === index ? 'bg-amber-600 text-white font-medium' : 'text-gray-600 hover:bg-gray-100'} p-2 px-4 text-lg  transition-colors rounded-full`}
//             >
//                 {month}
//             </button>
//         ))
//     }

//     const renderCalendarYear = () => {
//         const years = Array.from({ length: 12 }, (_, index) => tempDate.year() - index);
//         return years.map(year => (
//             <button
//                 key={year}
//                 onClick={() => {
//                     setTempDate(tempDate.set('year', year))
//                     handleOpen('day')
//                 }}
//                 className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//                 {year}
//             </button>
//         ))
//     }

//     const generateTimeOptions = (max: number, selected: number, type: TimeUnit) => {
//         const options = [];
//         for (let i = 0; i < max; i++) {
//             const isSelected = i === selected;
//             options.push(
//                 <button
//                     key={i}
//                     onClick={() => setTempDate(tempDate.set(type, i))}
//                     className={`size-fit p-3 aspect-square !rounded-full text-sm transition-colors ${isSelected
//                         ? 'bg-amber-600 text-white rounded-lg font-medium'
//                         : 'text-gray-600 hover:bg-gray-100'
//                         }`}
//                 >
//                     {i.toString().padStart(2, '0')}
//                 </button>
//             );
//         }
//         return options;
//     };

//     const handleOpen = (value: string) => {
//         SetOpen(value)
//         console.log(value)
//     }

//     const handleConfirm = () => {
//         SetOpen('day')
//     };

//     const handleCancel = () => {
//         tempDate.set('year', today.year())
//         tempDate.set('month', today.month())
//         tempDate.set('date', today.date())
//         tempDate.set('hour', today.hour())
//         tempDate.set('minute', today.minute())
//         SetOpen('day')
//     }


//     return (
//         <div className="w-[40rem] flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
//                 <div className="grid grid-cols-3 h-full max-h-[24rem]">
//                     {open === 'day' && (
//                         <div className="col-span-2 w-full h-full border-b-2 border-r-2 flex flex-col items-start justify-start p-4">
//                             {/* Calendar Header */}
//                             <div className="flex w-full h-20 items-center justify-between">
//                                 <button
//                                     onClick={() => navigateMonth('prev')}
//                                     className="hover:bg-gray-100 rounded-lg transition-colors size-fit shadow-sm p-2"
//                                 >
//                                     <ChevronLeft className="w-5 h-5" />
//                                 </button>
//                                 <button onClick={() => handleOpen('month')} className="text-lg font-medium text-gray-800">
//                                     {tempDate.format('MMMM YYYY')}
//                                 </button>
//                                 <button
//                                     onClick={() => navigateMonth('next')}
//                                     className="hover:bg-gray-100 rounded-lg transition-colors size-fit shadow-sm p-2"
//                                 >
//                                     <ChevronRight className="w-5 h-5" />
//                                 </button>
//                             </div>

//                             <div className="flex w-full h-full">
//                                 {/* Calendar */}
//                                 <div className="flex-1 ">
//                                     {/* Week days header */}
//                                     <div className="grid grid-cols-7 gap-1 mb-2">
//                                         {weekDays.map(day => (
//                                             <div key={day} className="text-xs text-gray-500 text-center py-2 font-medium">
//                                                 {day}
//                                             </div>
//                                         ))}
//                                     </div>

//                                     {/* Calendar grid */}
//                                     <div className="grid grid-cols-7 gap-1">
//                                         {renderCalendarDays()}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                     {open === 'month' && (
//                         <div className="col-span-2 w-full h-full border-b-2 border-r-2 flex flex-col items-start justify-start p-4">
//                             {/* Calendar Header */}
//                             <div className="flex w-full h-20 items-center justify-between ">
//                                 <button
//                                     onClick={() => navigateYear('prev')}
//                                     className=" hover:bg-gray-100 rounded-lg transition-colors size-fit shadow-sm p-2"
//                                 >
//                                     <ChevronLeft className="w-5 h-5" />
//                                 </button>
//                                 <button onClick={() => handleOpen('year')} className="text-lg font-medium text-gray-800">
//                                     {tempDate.year()}
//                                 </button>
//                                 <button
//                                     onClick={() => navigateYear('next')}
//                                     className=" hover:bg-gray-100 rounded-lg transition-colors size-fit shadow-sm p-2"
//                                 >
//                                     <ChevronRight className="w-5 h-5" />
//                                 </button>
//                             </div>

//                             <div className="flex w-full h-full">

//                                 <div className="flex-1 ">

//                                     <div className="grid grid-cols-3 grid-rows-4 gap-4">
//                                         {renderCalendarMonths()}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                     {open === 'year' && (
//                         <div className="col-span-2 w-full h-full border-b-2 border-r-2 flex flex-col items-start justify-start p-4">
//                             {/* Calendar Header */}
//                             <div className="flex w-full h-20 items-center justify-between">
//                                 <button
//                                     onClick={() => navigateYear('prev')}
//                                     className=" hover:bg-gray-100 rounded-lg transition-colors size-fit shadow-sm p-2"
//                                 >
//                                     <ChevronLeft className="w-5 h-5" />
//                                 </button>
//                                 <button className="text-lg font-medium text-gray-800">
//                                     {tempDate.year() - 11} - {tempDate.year()}
//                                 </button>
//                                 <button
//                                     onClick={() => navigateYear('next')}
//                                     className=" hover:bg-gray-100 rounded-lg transition-colors size-fit shadow-sm p-2"
//                                 >
//                                     <ChevronRight className="w-5 h-5" />
//                                 </button>
//                             </div>

//                             <div className="flex w-full h-full">
//                                 {/* Calendar */}
//                                 <div className="flex-1 ">
//                                     {/* Calendar grid */}
//                                     <div className="grid grid-cols-3 grid-rows-4 gap-4">
//                                         {renderCalendarYear()}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                     {/* Time Picker */}
//                     <div className="col-span-1 h-full max-h-[24rem] border-b-2 overflow-hidden">
//                         <div className="w-full flex justify-between  h-full">
//                             <div className="w-full text-center h-full">
//                                 <div className="text-sm font-medium text-gray-700 ">Hour</div>
//                                 <div className="mb-4 h-full max-h-[20rem] overflow-y-auto rounded-lg">
//                                     <div className="p-2">
//                                         {generateTimeOptions(24, tempDate.hour(), 'hour')}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="w-full text-center ml-2 h-full">
//                                 <div className="text-sm font-medium text-gray-700">Minute</div>
//                                 <div className="mb-4 h-full max-h-[20rem] overflow-y-auto rounded-lg">
//                                     <div className="p-2">
//                                         {generateTimeOptions(60, tempDate.minute(), 'minute')}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col justify-center items-center">
//                     <div className="flex w-full justify-end items-center p-4 border-b-2">
//                         <div className="w-2/3 flex gap-4">
//                             <button
//                                 onClick={handleCancel}
//                                 className="w-full p-1 px-6 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium"
//                             >
//                                 Hủy
//                             </button>
//                             <button
//                                 onClick={handleConfirm}
//                                 className="w-full p-1 px-6 bg-yellow-400 text-gray-800 rounded-md hover:bg-yellow-500 transition-colors font-medium"
//                             >
//                                 Chọn
//                             </button>
//                         </div>
//                     </div>
//                     <div className="flex flex-col w-full justify-between items-center">
//                         <div>Date: {tempDate.date()} - {months[tempDate.month()]} - {tempDate.year()}</div>
//                         <div>Time: {tempDate.hour()}h - {tempDate.minute()}m</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
