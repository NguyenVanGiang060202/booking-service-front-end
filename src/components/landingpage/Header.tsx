
import { LoginPopup } from '@/pages/Auth/Login/components/LoginSignUpPopup'
import { Button } from '../ui/button'
import {
    Navbar,
    NavBody,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "./resizable-navbar";
import { useState } from "react";
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Header() {
    const { user, logout } = useAuth()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <>
            <div className="relative w-full">
                <Navbar className='focus:outline-none w-full'>
                    {/* Desktop Navigation */}
                    <NavBody>
                        <NavbarLogo />
                        {user ? (
                            <div className="flex gap-4 items-center size-12 w-fit justify-end">
                                <NavbarButton href="/dashboard" variant="primary" className='text-xl bg-white w-40'>Dash Board</NavbarButton>
                                <div className='flex justify-center items-center w-fit h-12 max-h-12 font-bold'>{user.firstName} {user.lastName} </div>
                                <Avatar onClick={logout} className='w-full h-full max-h-12 max-w-12'>
                                    <AvatarImage src={user.image} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                        ) : (
                            <div className="flex gap-4 items-center">
                                <NavbarButton href="/dashboard" className='text-xl' variant="secondary">Dash Board</NavbarButton>
                                {/* <LoginPopup /> */}
                                <NavbarButton href='/login' variant="primary" type="submit" className="h-full text-base lg:text-xl">Login</NavbarButton>
                            </div>
                        )}
                    </NavBody>

                    {/* Mobile Navigation */}
                    <MobileNav>
                        <MobileNavHeader>
                            <NavbarLogo />
                            <MobileNavToggle
                                isOpen={isMobileMenuOpen}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            />
                        </MobileNavHeader>

                        <MobileNavMenu
                            isOpen={isMobileMenuOpen}
                            onClose={() => setIsMobileMenuOpen(false)}
                        >
                            <div className="flex flex-col gap-4 w-full">
                                <LoginPopup />
                                <NavbarButton
                                    href="/dashboard"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    variant="primary"
                                    className="w-full"
                                >
                                    Dash Board
                                </NavbarButton>
                            </div>
                        </MobileNavMenu>
                    </MobileNav>
                </Navbar>

                {/* Navbar */}
            </div>
        </>
    )
}
