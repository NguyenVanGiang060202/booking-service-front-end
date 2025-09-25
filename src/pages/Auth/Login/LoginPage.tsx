import { GalleryVerticalEnd } from 'lucide-react'
import React from 'react'
import LoginForm from './components/LoginForm'
import { Link } from 'react-router-dom'

export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex gap-2 justify-center md:justify-start">
                    <Link to="/" className="flex gap-2 items-center font-medium">
                        <div className="flex justify-center items-center rounded-md bg-primary text-primary-foreground size-6">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        Acme Inc.
                    </Link>
                </div>
                <div className="flex flex-1 justify-center items-center">
                    <div className="w-full max-w-[26rem]">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="hidden relative bg-muted lg:block">
                <img
                    src="/img/howitwork_image.jpg"
                    alt="Image"
                    className="object-cover absolute inset-0 w-full h-full dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
