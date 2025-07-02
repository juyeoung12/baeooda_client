import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const NaverRedirect = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const hasCalled = useRef(false);

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    const fetchNaverUser = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");

      if (!code || !state) {
        alert("❌ code 또는 state 없음");
        navigate("/");
        return;
      }

      try {
        const res = await axios.post(`${API_URL}/api/oauth/naver`, { code, state }, {
          withCredentials: true,
        });

        const { token, user } = res.data;

        if (!token || !user) {
          alert("❌ 사용자 정보 없음");
          navigate("/");
          return;
        }

        login(user, token); // ✅ 핵심 수정
        alert(`${user.nickname || user.username}님, 환영합니다`);
        navigate("/");
      } catch (err) {
        console.error("❌ 네이버 로그인 실패:", err.response?.data || err.message);
        alert("❌ 네이버 로그인 실패");
        navigate("/");
      }
    };

    fetchNaverUser();
  }, [login, navigate]);

  return <div>네이버 로그인 처리 중...</div>;
};

export default NaverRedirect;
