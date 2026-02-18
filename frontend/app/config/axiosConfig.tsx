import axios from 'axios';

// สร้าง instance ของ axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com', // ตัวอย่าง URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // รอ response นานสุด 10 วินาที
});

// (Optional) เพิ่ม Interceptors สำหรับจัดการ Request/Response
api.interceptors.request.use((config) => {
  // เช่น ใส่ Token อัตโนมัติ
  // const token = localStorage.getItem('token');
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;