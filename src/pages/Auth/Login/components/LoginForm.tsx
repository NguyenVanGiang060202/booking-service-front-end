import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoaderCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schema/auth'
import { z } from 'zod'
import { Checkbox } from '@/components/ui/checkbox'

export default function LoginForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const { login, logout, isLoading, getInfoUser } = useAuth();
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<string>('');
    const [isRememberMe, setIsRememberMe] = useState<boolean>(false)

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
            rememberMe: false,
        },
    });

    async function handleLoginSubmit(values: z.infer<typeof loginSchema>) {
        try {
            await login(values.username, values.password, values.rememberMe);
            navigate('/dashboard');

        } catch (e: any) {
            setError(e.message);
        }
    }



    return (
        <Card className="overflow-hidden p-0 my-14 w-full border-0 shadow-none">
            <CardHeader>
                <CardTitle>
                    <div className="flex flex-col gap-2 items-center text-center">
                        <h1 className="text-lg font-bold lg:text-4xl">Welcome back</h1>
                        <p className="text-sm lg:text-base text-muted-foreground">
                            Enter your username below to login to your account
                        </p>
                        <p className="text-sm lg:text-base text-muted-foreground">
                            Email: emilys
                        </p>
                        <p className="text-sm lg:text-base text-muted-foreground">
                            Password: emilyspass
                        </p>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="grid p-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLoginSubmit)}>
                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name='username'
                                render={({ field }) => (
                                    <div className="grid gap-3">
                                        <FormLabel className="after:content-['_*'] after:text-red-600 pb-1" htmlFor="username">Username</FormLabel>
                                        <Input id="username" placeholder="Username" type="text" autoCapitalize="none" disabled={isLoading} {...form.register('username')} />
                                        <FormMessage />
                                    </div>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <div className="grid gap-3">
                                        <FormLabel className="after:content-['_*'] after:text-red-600 pb-1" htmlFor="password">Password</FormLabel>
                                        <Input id="password" placeholder="Password" type="password" required disabled={isLoading} {...form.register('password')} />
                                        <FormMessage />
                                    </div>
                                )}
                            />
                            <div className="grid gap-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2 items-center">
                                        <FormField
                                            control={form.control}
                                            name="rememberMe"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="flex gap-2 items-center">
                                                            <Checkbox
                                                                id="rememberMe"
                                                                disabled={isLoading}
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                            <FormLabel
                                                                className="font-normal cursor-pointer"
                                                                htmlFor="rememberMe"
                                                            >
                                                                Remember me
                                                            </FormLabel>
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                    <Link
                                        to="#"
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>
                            <Button type="submit" onClick={form.handleSubmit(handleLoginSubmit)} className="w-full" disabled={isLoading}>
                                {isLoading && (
                                    <LoaderCircle className="mr-2 w-4 h-4 animate-spin" />
                                )}
                                Login
                            </Button>
                            {error && <p className={"text-sm text-destructive"}> {error} </p>}
                            <div className="text-sm text-center">
                                Don&apos;t have an account?{" "}
                                <Button type="button" variant={"link"} className="p-0">
                                    Sign up
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
