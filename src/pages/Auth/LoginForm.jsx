import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const isDev = import.meta.env.MODE === 'development';
const API_URL = import.meta.env.VITE_API_URL;

const KAKAO_CLIENT_ID = '4417287a95539d2c9a159c0ce8dccb3d';
const KAKAO_REDIRECT_URI = 'http://localhost:5173/oauth/kakao';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code${isDev ? '&prompt=login' : ''}`;

const NAVER_CLIENT_ID = 'htSMbYBIYhrqb5ng17C1';
const NAVER_REDIRECT_URI = 'http://localhost:5173/oauth/naver';
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&response_type=code&state=naver${isDev ? '&auth_type=reauthenticate' : ''}`;

const GOOGLE_CLIENT_ID = '267661652702-tuf4qtil6sfbad9lobr1b2rlr5eq0g58.apps.googleusercontent.com';
const GOOGLE_REDIRECT_URI = 'http://localhost:5173/oauth/google';
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email&prompt=consent${isDev ? '%20select_account' : ''}&access_type=offline`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

      console.log("🔍 API URL ▶", import.meta.env.VITE_API_URL);

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
      }, {
        withCredentials: true
      });

console.log("🔁 서버 응답:", res.data);

      const { token, user } = res.data;

      if (!token || !user) {
        alert('❌ 로그인 실패: 토큰 또는 유저 정보 없음');
        return;
      }

      login(user, token); // ✅ UserContext로 로그인 처리
      alert(`${user.nickname || user.username}님, 환영합니다`);
      navigate('/');
    } catch (err) {
      console.error('❌', err);
      const msg = err.response?.data?.message || err.response?.data?.error || '서버 오류';
      alert(`❌ ${msg}`);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '370px', padding: '46px 52px 21px', backgroundColor: '#fff', textAlign: 'center', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '27px', textAlign: 'left' }}>로그인</h2>

        <form onSubmit={handleLogin} style={{ display: 'flex', gap: '10px' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', flex: 1 }}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디"
              style={inputStyleTop}
            />
            <div style={{ height: '1px', backgroundColor: '#ddd' }} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              style={inputStyleBottom}
            />
          </div>
          <button type="submit" style={buttonStyle}>로그인</button>
        </form>

        <button onClick={() => navigate('/auth?mode=find')} style={findButtonStyle}>
          아이디/비밀번호 찾기
        </button>

        <div style={styles.dividerContainer}>
          <div style={styles.line} />
          <span style={styles.dividerText}>간편 로그인</span>
          <div style={styles.line} />
        </div>

        <div style={styles.snsContainer}>
          <button onClick={() => window.location.href = KAKAO_AUTH_URL} style={styles.snsButton}>
            <img src="/kakao.png" alt="카카오 로그인" style={styles.icon} />
            <p style={{ fontSize: '14px' }}>카카오 계정으로 로그인</p>
          </button>
          <button onClick={() => window.location.href = NAVER_AUTH_URL} style={styles.snsButton}>
            <img src="/naver.png" alt="네이버 로그인" style={styles.icon} />
            <p style={{ fontSize: '14px' }}>네이버 계정으로 로그인</p>
          </button>
          <button onClick={() => window.location.href = GOOGLE_AUTH_URL} style={styles.snsButton}>
            <img src="/google.png" alt="구글 로그인" style={styles.iconSmall} />
            <p style={{ fontSize: '14px' }}>Google 계정으로 로그인</p>
          </button>

          <div style={styles.signupBox}>
            <p style={styles.signupText}>아직도 배우다 회원이 아니신가요?</p>
            <button onClick={() => navigate('/auth?mode=terms')} style={styles.signupLink}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

const inputStyleTop = {
  width: '100%',
  padding: '12px 17px',
  border: 'none',
  fontSize: '14px',
  borderRadius: '8px 8px 0 0',
  boxSizing: 'border-box'
};

const inputStyleBottom = {
  width: '100%',
  padding: '12px 17px',
  border: 'none',
  fontSize: '14px',
  borderRadius: '0 0 8px 8px',
  marginTop: '1px',
  boxSizing: 'border-box'
};

const buttonStyle = {
  width: '78px',
  padding: '13px',
  borderRadius: '8px',
  backgroundColor: '#ED6051',
  color: 'white',
  fontWeight: 'bold',
  border: 'none',
  cursor: 'pointer',
  height: '86px',
  fontSize: '15px'
};

const findButtonStyle = {
  color: '#737882',
  fontSize: '13px',
  fontWeight: 'bold',
  padding: '2px 0 0 15px',
  marginTop: '8px',
  background: 'none',
  border: 'none',
  textAlign: 'left',
  cursor: 'pointer'
};

const styles = {
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '30px 0 20px'
  },
  line: {
    flex: 1,
    height: '1px',
    backgroundColor: '#ddd'
  },
  dividerText: {
    padding: '0 10px',
    fontSize: '13px',
    color: '#666',
    whiteSpace: 'nowrap'
  },
  snsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '24px',
    alignItems: 'center',
    justifyContent: 'center'
  },
  snsButton: {
    background: '#F0F0F0',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '17px',
    width: '100%',
    justifyContent: 'center',
    height: '55px',
    borderRadius: '5px',
    fontSize: '15px',
    cursor: 'pointer',
    padding: 0
  },
  icon: {
    width: '38px',
    height: '38px'
  },
  iconSmall: {
    width: '33px',
    height: '33px'
  },
  signupBox: {
    display: 'flex',
    gap: '6px',
    marginTop: '8px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signupText: {
    color: 'rgb(153, 153, 153)',
    fontSize: '13.5px',
    margin: '5px 0 0 0'
  },
  signupLink: {
    color: 'rgb(106, 109, 117)',
    fontSize: '13.5px',
    fontWeight: 'bold',
    textDecoration: 'underline',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    height: '20px'
  }
};
