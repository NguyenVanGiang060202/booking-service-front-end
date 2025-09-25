import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import SearchSalon from './SearchSalon';
import { CardContent } from '@/components/ui/card';
import { searchApi } from '@/services/authApi';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


export default function SearchBar() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (search.trim() === '') {
                setResults([]);
                return;
            }

            const searchBar = async () => {
                try {
                    const { status, message, data } = await searchApi(search, sessionStorage.getItem('accessToken'));
                    const combinedArray = [
                        ...data.businesses,
                        ...data.services,
                        ...data.individuals
                    ];
                    setResults(combinedArray);
                    console.log('Search results:', combinedArray);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                    return [];
                }
            }
            searchBar()

        }, 300); // debounce sau 300ms

        return () => clearTimeout(timeout); // clear nếu user tiếp tục gõ
    }, [search]);
    return (
        <>
            <div className="p-4 w-full h-full bg-white rounded-xl md:h-20">
                <form className="flex justify-center items-center w-full h-full">
                    <div className="flex flex-col justify-center items-center space-y-4 w-full h-full md:flex-row md:space-y-0 md:space-x-4">
                        <div className="flex justify-center items-center space-x-4 w-full h-full">
                            <div className="relative w-2/3 h-full">
                                <Search className="absolute left-4 top-1/2 w-4 h-4 -translate-1/2 text-muted-foreground" />
                                <Input value={search}
                                    onChange={(e) => {
                                        setOpen(e.target.value.length > 0);
                                        setSearch(e.target.value)
                                    }}
                                    onBlur={() => {
                                        setTimeout(() => setOpen(false), 100000); // delay để chọn item
                                    }}
                                    onFocus={() => {
                                        if (search.length > 0) setOpen(true);
                                    }} placeholder="Search for a salon, individual or service" className="pl-8 w-full h-full" />
                                {open && results.length > 0 && (
                                    <DropdownMenu open={open} onOpenChange={setOpen} >
                                        <DropdownMenuTrigger className="absolute inset-0" />
                                        <DropdownMenuContent className="overflow-y-auto h-60 lg:w-[720px] lg:h-120 md:w-[280px] md:h-80 w-[180px]">
                                            <DropdownMenuLabel>Search Results</DropdownMenuLabel>
                                            {results.map((result, index) => (
                                                <DropdownMenuItem key={index} className="cursor-pointer">
                                                    {result.name || result.title}
                                                </DropdownMenuItem>
                                            ))}
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => setOpen(false)}>Close</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>
                            <div className="h-full lg:h-full lg:w-1/3">
                                <SearchSalon />
                            </div>
                        </div>
                        <Button className="w-full h-full bg-teal-800 md:h-full md:w-1/6" type="submit">Search</Button>
                    </div>
                </form>
            </div>
        </>
    )
}
