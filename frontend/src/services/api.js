// api.js - Handles all API calls to backend with credentials: 'include'
import axios from 'axios';

const API_BASE = 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Auth
export const register = (data) => api.post('/user/register', data);
export const login = (data) => api.post('/user/login', data);
export const logout = () => api.post('/user/logout');
export const getProfile = () => api.get('/user/getprofile');

// Categories
export const getAllCategories = () => api.get('/category/getallcategories');
export const addCategory = (data) => api.post('/category/addcategory', data);
export const deleteCategory = (data) => api.delete('/category/deletecategory', { data });

// Products
export const getAllProducts = () => api.get('/product/getallproducts');
export const getProductsByCategory = (categoryName) => api.get(`/product/getproductscategory/${categoryName}`);
export const getProductById = (id) => api.get(`/product/getproductsbyid/${id}`);
export const addProduct = (data) => api.post('/product/addproduct', data);

// Cart
export const addToCart = (p_id, quantity) => api.post(`/cart/addtocartbyid/${p_id}`, { quantity });
export const getCartProducts = () => api.get('/cart/getcartproducts');
export const deleteCartProduct = () => api.delete('/cart/deletecartproduct');
export const deleteCartProductById = (productid) => api.delete(`/cart/deletecartproduct/${productid}`);
export const updateCartProductQuantity = (productid, quantity) => api.put(`/cart/updatecartproduct/${productid}`, { quantity });

// Orders
export const createOrder = (p_id, quantity, address) => api.post(`/order/createorderbyid/${p_id}`, { quantity, address });

export default api;
