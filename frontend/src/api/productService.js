import api from "./api";

export const getProducts = () => api.get("/products");
export const getProductById = (id) => api.get(`/products/${id}`);

export const createProduct = (data) =>
  api.post("/admin/products", data);

export const updateProduct = (id, data) =>
  api.put(`/admin/products/${id}`, data);

export const deleteProduct = (id) =>
  api.delete(`/admin/products/${id}`);