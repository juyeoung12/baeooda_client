import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // 백엔드 주소
  withCredentials: true, // 쿠키 사용할 경우 (필요 없으면 생략 가능)
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
