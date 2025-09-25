import api from "@/axiosClient";

const API_URL = 'https://dummyjson.com';


export const loginApi = async (username: string, password: string) => {
    try {
        const res = await api.post(`${API_URL}/auth/login`, {
            username,
            password,
        });

        return res.data;
    } catch (err: any) {
        let errorMsg = "Login failed";

        if (err.response?.data?.message) {
            errorMsg = err.response.data.message;
        }

        throw new Error(errorMsg);
    }
};

export const signupApi = async (
    username: string,
    password: string,
    email?: string
) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error('Sign up failed');
    return data; // { accessToken, refreshToken }
};

export const getInfoUserApi = async (accessToken: string) => {
    try {
        const res = await api.get(`${API_URL}/auth/me`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // axios tự parse JSON -> { id, username, email, image }
        return res.data;
    } catch (err: any) {
        let errorMsg = "Login failed";

        if (err.response?.data?.message) {
            errorMsg = err.response.data.message;
        }

        throw new Error(errorMsg);
    }
};
export const refreshTokenApi = async (refreshToken: string) => {
    const res = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error('Token refresh failed');
    return data; // { accessToken }
};

export const getCategoriesPopularApi = async (page: number, limit: number, skip: number, accessToken: string) => {
    // const queryParams = new URLSearchParams({
    //     page: String(page),
    //     limit: String(limit),
    //     skip: String(skip),
    // });
    // const res = await fetch(`${API_URL}/categories/popular?${queryParams.toString()}`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${accessToken}`
    //     }
    // });
    // const data = await res.json();
    // if (!res.ok) throw new Error('Get popular categories failed');
    // return data; // { categories: Array<Category> }
    return null
}

export const getBusinessPopular = async (accessToken: string) => {
    // const res = await fetch(`${API_URL}/business/popular-salons`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${accessToken}`
    //     }
    // });
    // const data = await res.json();
    // if (!res.ok) throw new Error('Get popular businesses failed');
    // return data; // { businesses: Array<Business> }
    return null
}

export const getIndividualsPopular = async (accessToken: string) => {
    // const res = await fetch(`${API_URL}/individuals/popular`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${accessToken}`
    //     }
    // });
    // const data = await res.json();
    // if (!res.ok) throw new Error('Get popular individuals failed');
    // return data; // { individuals: Array<Individual> }
    return null
}

export const getServicePopular = async (accessToken: string) => {
    // const res = await fetch(`${API_URL}/services/popular`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${accessToken}`
    //     }
    // });
    // const data = await res.json();
    // if (!res.ok) throw new Error('Get popular services failed');
    // return data; // { services: Array<Service> }
    return null
}

export const searchApi = async (query: string, accessToken: string) => {
    // const res = await fetch(`${API_URL}/search?query=${query}}`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${accessToken}`
    //     }
    // });
    // const data = await res.json();
    // if (!res.ok) throw new Error('Search failed');
    // return data; // { results: Array<SearchResult> }
    return null
}