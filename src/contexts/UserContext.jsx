import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const API_URL = import.meta.env.VITE_API_URL;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ 앱 시작 시 localStorage의 JWT 토큰을 이용해 로그인 상태 유지
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      })
      .then((res) => {
        setUser(res.data); // res.data에 모든 정보가 들어있어야 함
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem('token');
      });
    }
  }, []);

  // ✅ 로그인 시 토큰 저장
  const login = (userData, token) => {
    setUser(userData); // userData 안에 email 포함돼야 함
    localStorage.setItem('token', token);
  };

  // ✅ 로그아웃 시 토큰 제거 및 상태 초기화
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);