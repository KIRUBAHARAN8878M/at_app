import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const loginUser = (data) => API.post('/login', data);
export const registerUser = (data) => API.post('/register', data);
export const getDashboardData = () => API.get('/admin/dashboard');
export const getUsers = () => API.get('/users');
export const addUser = (data) => API.post('/users', data);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const updateUserTask = (id, data) => API.put(`/tasks/${id}`, data);
export const getUserTasks = () => API.get('/tasks');
export const createTask = (data) => API.post('/tasks', data);
export const getAdminTasks = () => API.get('/admin/dashboard/tasks');
export const updateTaskStatus = (id, data) => API.put(`/admin/dashboard/tasks/${id}/status`, data);



export default API;
