import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("bike_lover_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("bike_lover_token");
        localStorage.removeItem("bike_lover_user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

export const bikesApi = {
  getAll: (params?: Record<string, unknown>) => api.get("/bikes", { params }),
  getOne: (slug: string) => api.get(`/bikes/${slug}`),
  getFeatured: () => api.get("/bikes/featured"),
  getByBrand: (brand: string, params?: Record<string, unknown>) =>
    api.get(`/bikes/brand/${brand}`, { params }),
  getLatest: (limit = 8) => api.get(`/bikes/latest?limit=${limit}`),
  create: (data: FormData) =>
    api.post("/bikes", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id: string, data: FormData) =>
    api.put(`/bikes/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id: string) => api.delete(`/bikes/${id}`),
};

export const authApi = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  logout: () => api.post("/auth/logout"),
  me: () => api.get("/auth/me"),
};

export const contactApi = {
  send: (data: {
    name: string;
    phone: string;
    email?: string;
    message: string;
    bikeId?: string;
  }) => api.post("/contact", data),
};

export const sellBikeApi = {
  submit: (data: Record<string, unknown>) => api.post("/sell-bike", data),
};

export const agreementApi = {
  getByToken: (token: string) => api.get(`/agreements/public/${token}`),
  sign: (token: string, signature: string) =>
    api.post(`/agreements/sign/${token}`, { signature }),
};
