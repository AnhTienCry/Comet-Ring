import axios from 'axios';

const api = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_BASE_URL ?? 'http://localhost:4000/api',
  timeout: 10000
});

export const fetchCollections = async () => api.get('/collections').then((res) => res.data);
export const fetchProducts = async (params?: Record<string, unknown>) =>
  api.get('/products', { params }).then((res) => res.data);
export const fetchProductBySlug = async (slug: string) =>
  api.get(`/products/${slug}`).then((res) => res.data);
export const fetchCollectionBySlug = async (slug: string) =>
  api.get(`/collections/${slug}`).then((res) => res.data);

export default api;

export const createProduct = async (formData: FormData) =>
  api.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => res.data);

export const updateProductApi = async (id: string, formData: FormData) =>
  api.put(`/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => res.data);

export const deleteProductApi = async (id: string) => api.delete(`/products/${id}`).then((res) => res.data);

