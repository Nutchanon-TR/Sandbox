import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ROOT_API_URL,
  // อนุญาตให้ใช้คุกกี้ข้ามโดเมน (ถ้าจำเป็น)
  // withCredentials: true,
});
