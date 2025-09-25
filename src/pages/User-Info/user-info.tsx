
import InputPhonenumber from './components/input-phonenumber';
import SelectTimeCalendar from './components/rangetime-calendar';








export default function UserInfo() {
        return (
            <div className="flex flex-col justify-start items-start p-10 space-y-8 h-full w-dvw md:p-20 lg:p-40 lg:py-10">
                <h2 className="text-5xl font-bold">User Info</h2>
                <div className="flex justify-between items-start space-y-8 w-full h-full">
                    <InputPhonenumber />
                    <SelectTimeCalendar/>
                </div>
            </div>

        )
    }
