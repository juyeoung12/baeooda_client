import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';

const API_URL = import.meta.env.VITE_API_URL;

const KakaoRedirect = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const executed = useRef(false);

  useEffect(() => {
    if (executed.current) return;
    executed.current = true;

    const code = new URL(window.location.href).searchParams.get('code');
    if (!code) {
      alert('❌ 인가 코드 없음');
      navigate('/login');
      return;
    }

    const fetchKakaoUser = async () => {
      try {
        const res = await axios.post(`${API_URL}/api/oauth/kakao`, { code }, {
          withCredentials: true,
        });

        const { token, user } = res.data;

        if (!token || !user) {
          alert('❌ 사용자 정보 없음');
          navigate('/login');
          return;
        }

        login(user, token);
        alert(`${user.nickname || user.username}님, 환영합니다`);
        navigate('/');
      } catch (err) {
        console.error('❌ 카카오 로그인 실패:', err.response?.data || err.message);
        alert('❌ 카카오 로그인 실패');
        navigate('/login');
      }
    };

    fetchKakaoUser();
  }, [login, navigate]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoRedirect;
