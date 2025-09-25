import React from 'react'
import Header from '@/components/landingpage/Header'
import Herosection from './Herosection'
import Category from './Category'
import Recommends from './Recommends'
import HowItWork from './HowItWork'
import PopularServices from './PopularServices'
import IntroJoinBusiness from './IntroJoinBusiness'
import LandingReviews from './LandingReviews'
import IntroduceMobile from './IntroduceMobile'
import Footer from '@/components/landingpage/Footer'
export default function LandingPage() {
    return (
        <div className='flex overflow-hidden overflow-x-hidden overscroll-y-none flex-col justify-center items-center h-full w-dvw lg:p-10'>
            <Header />
            <Herosection />
            <Category />
            <Recommends />
            <HowItWork />
            <PopularServices />
            <IntroJoinBusiness />
            <LandingReviews />
            <IntroduceMobile />
            <Footer />
        </div>
    )
}
