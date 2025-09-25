import { getInfoUserApi, loginApi, refreshTokenApi, signupApi } from '@/services/authApi';
import { createContext, useState, useEffect, type ReactNode } from 'react';

type User = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phone: string;
    image: string;
}

type AuthContextType = {
    accessToken: string | null;
    user: User | null;
    isLoading: boolean,
    login: (username: string, password: string, rememberMe: boolean) => Promise<void>;
    signup?: (username: string, password: string, email?: string) => Promise<void>;
    getInfoUser?: (accessToken: string) => Promise<any>;
    getCategoryPopularApi?: (accessToken: string) => Promise<any>;
    getBusinessPopularApi?: (accessToken: string) => Promise<any>;
    getIndividualsPopularApi?: (accessToken: string) => Promise<any>;
    getServicePopularApi?: (accessToken: string) => Promise<any>;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("accessToken") || null);
    const [user, setUser] = useState<User | null>(localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") || "") : null);
    const [isLoading, setIsLoading] = useState<boolean>(false);



    const login = async (username: string, password: string, rememberMe: boolean) => {
        try {
            setIsLoading(true);
            const res = await loginApi(username, password); // res: { accessToken, refreshToken, ... }
            if (res?.accessToken) {
                const {accessToken, refreshToken, ...userInfo} = res;
                if (rememberMe) {
                    setAccessToken(accessToken);
                    setUser({...userInfo});
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    localStorage.setItem("userInfo", JSON.stringify({...userInfo}));
                } else {
                    setAccessToken(accessToken);
                    setUser({...userInfo});
                    sessionStorage.setItem("accessToken", accessToken);
                    sessionStorage.setItem("refreshToken", refreshToken);
                    sessionStorage.setItem("userInfo", JSON.stringify({...userInfo}));
                }

                // const userInfo = await getInfoUser(res.accessToken, rememberMe);
            } else {
                // Nếu API trả về mà không có accessToken → coi như lỗi
                throw new Error(res?.message || "Đăng nhập thất bại");
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
        finally{
            setIsLoading(false);
        }
    };

    const signup = async (username: string, password: string, email: string) => {
        const { accessToken, refreshToken } = await signupApi(username, password, email);
        setAccessToken(accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
    };

    const logout = () => {
        setAccessToken(null);
        setUser(null);
        localStorage.clear();
        sessionStorage.clear();
    };

    const getInfoUser = async (accessToken: string) => {
        try {
            const data = await getInfoUserApi(accessToken);
            if (data) {
                return data
            } else {
                // Nếu API trả về mà không có accessToken → coi như lỗi
                throw new Error("Đăng nhập thất bại");
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    const getCategoriesPopularApi = async (page: number, limit: number, skip: number, accessToken: string) => {
        const { status, message, data } = await getCategoriesPopularApi(page, limit, skip, accessToken);
        return { status, message, data };
    }

    const getBusinessPopularApi = async (accessToken: string) => {
        const { status, message, data } = await getBusinessPopularApi(accessToken);
        return { status, message, data };
    }

    const getIndividualsPopularApi = async (accessToken: string) => {
        const { status, message, data } = await getIndividualsPopularApi(accessToken);
        return { status, message, data };
    }

    const getServicePopularApi = async (accessToken: string) => {
        const { status, message, result } = await getServicePopularApi(accessToken);
        return { status, message, result };
    }

    const searchApi = async (query: string, accessToken: string) => {
        const { status, message, result } = await searchApi(query, accessToken);
        return { status, message, result };
    }

    const refresh = async () => {
        const refreshToken = sessionStorage.getItem('refreshToken');
        if (refreshToken) {
            try {
                const { accessToken: newToken } = await refreshTokenApi(refreshToken);
                setAccessToken(newToken);
            } catch (err) {
                logout();
            }
        }
    };


    return (
        <AuthContext.Provider value={{ accessToken, user, isLoading, login, logout, getInfoUser }}>
            {children}
        </AuthContext.Provider>
    );
}
