import axios from "axios";


const API_URL = 'https://dummyjson.com';

const api = axios.create({
  baseURL: API_URL, 
});

const getLocalAccessToken = () => localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
const getLocalRefreshToken = () => localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");


const updateLocalAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
  sessionStorage.setItem("accessToken", token);
};

// Hàm gọi refresh token API
const refreshAccessToken = async () => {
  const refreshToken = getLocalRefreshToken();
  if (!refreshToken) throw new Error("No refresh token");

  const res = await axios.post(`${API_URL}/auth/refresh`, {
    refreshToken,
  });

  const newAccessToken = res.data.accessToken;
  updateLocalAccessToken(newAccessToken);
  return newAccessToken;
};

// Request interceptor: tự động gắn accessToken vào header
api.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: nếu 401 thì refresh token và retry
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalConfig = error.config;

    if (error.response?.status >= 401 && !originalConfig._retry) {
      originalConfig._retry = true; // tránh lặp vô hạn
      try {
        const newToken = await refreshAccessToken();
        originalConfig.headers.Authorization = `Bearer ${newToken}`;
        return api(originalConfig); // retry request với token mới
      } catch (err) {
        // Nếu refresh fail thì logout
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
