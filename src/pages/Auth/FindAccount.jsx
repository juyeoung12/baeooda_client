import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FindAccount = () => {
  const [tab, setTab] = useState('id');
  const [name, setName] = useState('');
  const [emailForId, setEmailForId] = useState('');
  const [username, setUsername] = useState('');
  const [emailForPw, setEmailForPw] = useState('');

  const navigate = useNavigate();

  const handleFindId = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/find-id`, {
        name,
        email: emailForId,
      });
      if (res.data.success) {
        alert(`✅ 아이디는 "${res.data.username}" 입니다.`);
      } else {
        alert('❌ 일치하는 사용자 정보가 없습니다.');
      }
    } catch (err) {
      alert('❌ 서버 오류가 발생했습니다.');
    }
  };

  const handleFindPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
        username,
        email: emailForPw,
      });

      if (res.data.success) {
        alert(`✅ 임시 비밀번호가 이메일(${emailForPw})로 전송되었습니다.`);
        navigate('/auth?mode=login');
      } else {
        alert('❌ 일치하는 사용자 정보가 없습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('❌ 비밀번호 찾기에 실패했습니다.');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.tabContainer}>
        <button
          onClick={() => setTab('id')}
          style={{
            ...styles.tab,
            fontWeight: tab === 'id' ? 'bold' : 'normal',
            color: tab === 'id' ? 'black' : '#999',
          }}
        >
          아이디
        </button>
        <span style={{ color: '#ccc' }}>|</span>
        <button
          onClick={() => setTab('pw')}
          style={{
            ...styles.tab,
            fontWeight: tab === 'pw' ? 'bold' : 'normal',
            color: tab === 'pw' ? 'black' : '#999',
          }}
        >
          비밀번호
        </button>
      </div>

      {tab === 'id' ? (
        <form onSubmit={handleFindId} style={styles.formId}>
          <input
            type="text"
            placeholder="이름*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="이메일*"
            value={emailForId}
            onChange={(e) => setEmailForId(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.submitBtn}>아이디 확인</button>
          <div style={styles.loginLink}>
            <span>이미 가입된 계정이 있으신가요?</span>
            <button
              type="button"
              onClick={() => navigate('/auth?mode=login')}
              style={styles.boldLink}
            >
              로그인
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleFindPassword} style={styles.form}>
          <p style={styles.description}>
            가입하신 이메일 주소를 입력해주세요. <br />
            이메일 주소로 비밀번호 재설정 할 수 있습니다.
          </p>
          <input
            type="text"
            placeholder="아이디*"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="이메일*"
            value={emailForPw}
            onChange={(e) => setEmailForPw(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.submitBtn}>전송하기</button>
          <div style={styles.loginLink}>
            <span>아직 가입된 계정이 없으신가요?</span>
            <button
              type="button"
              onClick={() => navigate('/auth?mode=login')}
              style={styles.boldLink}
            >
              로그인
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    width: '100%',
    maxWidth: '360px',
    margin: '100px auto',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
  },
  tab: {
    fontSize: '16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formId: {
    marginTop: '18px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '280px',
    height: '45px',
    marginBottom: '10px',
    padding: '0px 12px',
    borderRadius: '8px',
    border: '1px solid rgb(204, 204, 204)',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  submitBtn: {
    padding: '12px',
    backgroundColor: '#F35748',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
    width: '280px',
    height: '50px',
  },
  loginLink: {
    marginTop: '16px',
    fontSize: '13.5px',
    color: 'rgb(153, 153, 153)',
  },
  boldLink: {
    marginLeft: '6px',
    fontWeight: 'bold',
    color: 'rgb(106, 109, 117)',
    background: 'none',
    border: 'none',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '13.5px',
    padding: '0',
  },
  description: {
    fontSize: '13px',
    color: '#555',
    lineHeight: 1.4,
    margin: '17px 0 23px 0',
  },
};

export default FindAccount;
