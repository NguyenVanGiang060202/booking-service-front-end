import React from 'react'
import Header from '@/components/landingpage/Header'
import { useAuth } from '@/hooks/useAuth'
import { Award, Calendar, Eye, Mail, MapPin, MessageCircle, Phone, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function dashboard() {
    const { user, getInfoUser } = useAuth()
    const [userFullInfo, setUserFullInfo] = useState(null)
    async function getUser() {
        try {
            const res = await getInfoUser(localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken"))
            setUserFullInfo(res)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex overflow-hidden overflow-x-hidden overscroll-y-none relative flex-col justify-center items-center w-full h-full min-h-screen lg:p-10">
            {/* Dual Gradient Overlay (Bottom) Background */}
            <div
                className="absolute inset-0 -z-1"
                style={{
                    backgroundImage: `
          linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
          radial-gradient(circle 500px at 20% 100%, rgba(139,92,246,0.3), transparent),
          radial-gradient(circle 500px at 100% 80%, rgba(59,130,246,0.3), transparent)
        `,
                    backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
                }}
            />
            <Header />
            {user && (
                <div className="relative w-full max-w-lg h-full rounded-3xl border shadow-lg backdrop-blur-xl transition-all duration-500 transform bg-white/80 hover:scale-[1.02] hover:shadow-3xl border-white/20">
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br to-transparent rounded-3xl pointer-events-none from-white/10"></div>

                    {/* Header Background */}
                    <div className="rounded-t-3xl relative h-40 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
                        <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/30"></div>
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-4 left-4 w-20 h-20 rounded-full blur-xl bg-white/20"></div>
                            <div className="absolute top-8 right-8 w-16 h-16 rounded-full blur-lg bg-white/10"></div>
                            <div className="absolute bottom-4 left-1/2 w-24 h-24 rounded-full blur-2xl bg-white/15"></div>
                        </div>
                    </div>

                    {/* Profile Section */}
                    <div className="relative px-8 pb-8 w-full h-full">
                        {/* Avatar */}
                        <div className="flex justify-center -mt-20 mb-6">
                            <img
                                src={user.image}
                                alt={user.firstName + " " + user.lastName}
                                className="object-cover w-36 h-36 rounded-full border-4 ring-4 shadow-2xl border-white/90 ring-white/50"
                            />
                        </div>

                        {/* User Info */}
                        <div className="mb-8 text-center">
                            <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">{user.firstName + " " + user.lastName}</h2>
                        </div>

                        {/* Contact Information */}
                        <div className="">
                            <div className="flex items-center p-3 space-x-4 text-gray-700 rounded-xl transition-all duration-200 cursor-pointer hover:text-indigo-600 group hover:bg-indigo-50/50">
                                <div className="p-2 bg-blue-100 rounded-lg transition-colors group-hover:bg-blue-200">
                                    <Mail size={18} className="text-blue-600" />
                                </div>
                                <span className="text-sm font-medium">Email: {userFullInfo?.email}</span>
                            </div>

                            <div className="flex items-center p-3 space-x-4 text-gray-700 rounded-xl transition-all duration-200 cursor-pointer hover:text-green-600 group hover:bg-green-50/50">
                                <div className="p-2 bg-green-100 rounded-lg transition-colors group-hover:bg-green-200">
                                    <Phone size={18} className="text-green-600" />
                                </div>
                                <span className="text-sm font-medium">Phone: {userFullInfo?.phone}</span>
                            </div>

                            <div className="flex items-center p-3 space-x-4 text-gray-700 rounded-xl group">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <MapPin size={18} className="text-red-600" />
                                </div>
                                <span className="text-sm font-medium">Location: {userFullInfo?.address?.address}</span>
                            </div>

                            <div className="flex items-center p-3 space-x-4 text-gray-700 rounded-xl group">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Calendar size={18} className="text-purple-600" />
                                </div>
                                <span className="text-sm font-medium">Birth Day: {userFullInfo?.birthDate}</span>
                            </div>
                        </div>
                        
                        {/* Stats */}
                        <div className="flex justify-around p-4 border-t border-gray-200/60">
                            <div className="text-center group">
                                <div className="flex justify-center items-center mb-1 space-x-2 text-indigo-600">
                                    <div className="p-2 bg-indigo-100 rounded-lg transition-colors group-hover:bg-indigo-200">
                                        <Users size={18} />
                                    </div>
                                    <span className="text-2xl font-bold">24</span>
                                </div>
                                <p className="text-sm font-medium text-gray-600">Projects</p>
                            </div>

                            <div className="text-center group">
                                <div className="flex justify-center items-center mb-1 space-x-2 text-amber-600">
                                    <div className="p-2 bg-amber-100 rounded-lg transition-colors group-hover:bg-amber-200">
                                        <Award size={18} />
                                    </div>
                                    <span className="text-2xl font-bold">3</span>
                                </div>
                                <p className="text-sm font-medium text-gray-600">Badges</p>
                            </div>
                        </div>
                        <Button onClick={getUser}>Get Full Information</Button>
                    </div>
                </div>
            )}
        </div>

    )
}
