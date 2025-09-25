
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/useAuth"
import {  signupApi } from "@/services/authApi"
import { LoaderCircle } from 'lucide-react';
import { useState } from "react"
import { Checkbox } from "../../../../components/ui/checkbox"
import { NavbarButton } from "../../../../components/landingpage/resizable-navbar"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"

import { useNavigate, useLocation } from 'react-router-dom';



export function LoginPopup() {

    const navigate = useNavigate();
    const location = useLocation();

    const [open, setOpen] = useState(false);
    const { login, logout, getInfoUser } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<any>(null);

    const [isLoginPopup, setIsLoginPopup] = useState(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // const [error, setError] = useState('');


    async function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setIsLoading(true)
            await login(username, password);
            setOpen(false);
            navigate('/dashboard');

        } catch (e: any) {
            console.error("Lỗi: ", e)
            alert('Đăng nhập thất bại');
        }
        finally {
            setIsLoading(false)
            const { status, message, data } = await getInfoUser(sessionStorage.getItem('accessToken'));
            setUser(data?.user)
            sessionStorage.setItem('userInfo', JSON.stringify(data?.user));
        }
    }
    async function handleSignupSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const { refreshToken } = await signupApi(username, password);
            sessionStorage.setItem('refreshToken', refreshToken);
            await login(username, password);
        } catch (err: any) {
            // setError(err.message || 'Signup failed');
        }

        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }


    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild className="">
                    {user ?
                        <>
                            <div className="flex justify-center items-center px-3 bg-white rounded-full w-fit h-fit" onClick={() => { setUser(null); logout() }}>
                                <Avatar className="p-1 bg-white rounded-full grayscale size-14" >
                                    <AvatarImage src='/img/avatarimg.png' alt={user.email} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-sm leading-tight text-left">
                                    <span className="text-lg font-medium truncate">{user.last_name}</span>
                                </div>
                            </div>
                        </>
                        : <NavbarButton variant="primary" type="submit" className="h-full text-base lg:text-xl">Login</NavbarButton>
                    }
                </DialogTrigger>
                <DialogContent className="z-60 lg:w-fit w-full h-fit lg:m-4 m-0 border-2 flex justify-center items-center md:max-w-[96%]">
                    <div className="flex flex-col w-full">
                        {isLoginPopup ?
                            <Card className="overflow-hidden p-0 my-14 w-full border-0 shadow-none" hidden={!isLoginPopup}>
                                <DialogHeader>
                                    <DialogTitle>
                                        <div className="flex flex-col items-center text-center">
                                            <h1 className="text-lg font-bold lg:text-2xl">Welcome back</h1>
                                            <p className="text-sm text-muted-foreground text-balance lg:text-base">
                                                Enter your username below to login to your account
                                            </p>
                                        </div>
                                    </DialogTitle>
                                </DialogHeader>
                                <CardContent className="grid p-0">
                                    <form onSubmit={handleLoginSubmit} className="p-1 md:p-2">
                                        <div className="flex flex-col gap-6">
                                            <div className="grid gap-3">
                                                <Label className="" htmlFor="username">
                                                    Username
                                                </Label>
                                                <Input
                                                    id="username"
                                                    placeholder="Username"
                                                    type="text"
                                                    autoCapitalize="none"
                                                    disabled={isLoading}
                                                    value={username}
                                                    onChange={e => setUsername(e.target.value)}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <div className="flex items-center">
                                                    <Label htmlFor="password">Password</Label>
                                                    <a
                                                        href="#"
                                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                                    >
                                                        Forgot your password?
                                                    </a>
                                                </div>
                                                <Input id="password" placeholder="Password" type="password" required onChange={e => setPassword(e.target.value)} />
                                            </div>
                                            <Button type="submit" className="w-full" disabled={isLoading}>
                                                {isLoading && (
                                                    <LoaderCircle className="mr-2 w-4 h-4 animate-spin" />
                                                )}
                                                Login
                                            </Button>
                                            <div className="text-sm text-center">
                                                Don&apos;t have an account?{" "}
                                                <Button type="button" variant={"link"} className="p-0" onClick={() => { setIsLoginPopup(!isLoginPopup) }}>
                                                    Sign up
                                                </Button>
                                            </div>

                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                            :
                            <Card className="overflow-hidden p-0 border-0 shadow-none" hidden={isLoginPopup}>
                                <DialogHeader>
                                    <DialogTitle>
                                        <div className="flex flex-col items-center text-center">
                                            <h1 className="text-2xl font-bold">Create account</h1>
                                            <p className="text-muted-foreground text-balance">
                                                Enter your information below to create your account
                                            </p>
                                        </div>
                                    </DialogTitle>
                                </DialogHeader>
                                <CardContent className="grid p-0">
                                    <form onSubmit={handleSignupSubmit} className="p-1 md:p-2">
                                        <div className="flex flex-col gap-3 lg:gap-6">

                                            <div className="grid gap-1 lg:gap-3">
                                                <div className="flex items-center">
                                                    <Label htmlFor="username">Username</Label>
                                                </div>
                                                <Input id="username" placeholder="Username" type="text" onChange={e => setPassword(e.target.value)} />
                                            </div>
                                            <div className="grid gap-1 lg:gap-3">
                                                <Label className="" htmlFor="email">
                                                    Username
                                                </Label>
                                                <Input
                                                    id="email"
                                                    placeholder="example@email.com"
                                                    type="tẽt"
                                                    autoCapitalize="none"
                                                    autoComplete="email"
                                                    autoCorrect="off"
                                                    disabled={isLoading}
                                                    value={username}
                                                    onChange={e => setUsername(e.target.value)}
                                                />
                                            </div>
                                            <div className="grid gap-1 lg:gap-3">
                                                <div className="flex items-center">
                                                    <Label htmlFor="password">Password</Label>
                                                </div>
                                                <Input id="password" placeholder="Password" type="password" required onChange={e => setPassword(e.target.value)} />
                                            </div>
                                            <div className="grid gap-1 lg:gap-3">
                                                <div className="flex items-center">
                                                    <Label htmlFor="password">Confirm Password</Label>
                                                </div>
                                                <Input id="password" placeholder="Password" type="password" required onChange={e => setPassword(e.target.value)} />
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="terms" />
                                                <label
                                                    htmlFor="terms"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Accept terms and conditions
                                                </label>
                                            </div>
                                            <Button type="submit" className="w-full" disabled={isLoading}>
                                                {isLoading && (
                                                    <LoaderCircle className="mr-2 w-4 h-4 animate-spin" />
                                                )}
                                                Sign up
                                            </Button>
                                            <div className="text-sm text-center">
                                                Already have an account?{" "}
                                                <Button type="button" variant={"link"} className="p-0" onClick={() => setIsLoginPopup(!isLoginPopup)}>
                                                    Sign in
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>}
                        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                            and <a href="#">Privacy Policy</a>.
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
