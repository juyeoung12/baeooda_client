// src/pages/AuthPage.jsx
import React, { useEffect, useState } from 'react';
import Login from './LoginForm';
import SignUp from './SignUpForm';
import Terms from './Terms';
import FindAccount from './FindAccount';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const [activeForm, setActiveForm] = useState(mode);

  useEffect(() => {
    setActiveForm(mode);
  }, [mode]);

  const handleSwitch = (form) => {
    setActiveForm(form);
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <button onClick={() => navigate('/')} style={styles.home}>
          <img src="/icons/home.svg" alt="홈" style={styles.arrow} />
        </button>
        <img src="/favicon.png" alt="logo" style={styles.logo} />
        <h2 style={styles.title}>배우다에 오신 걸 환영합니다!</h2>
        <p style={styles.subtitle}>언제 어디서든, 배움은 배우다에서</p>
      </div>

      <div style={styles.rightSection}>
        {activeForm === 'login' && <Login onSwitch={setActiveForm} />}
        {activeForm === 'find' && <FindAccount onSwitch={handleSwitch} />}
        {activeForm === 'signup' && <SignUp onSwitch={handleSwitch} />}
        {activeForm === 'terms' && <Terms onSwitch={handleSwitch} />}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    width: '1320px',
    height: '670px',
    margin: '50px auto',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    fontFamily: 'sans-serif',
  },
  leftSection: {
    width: '40%',
    backgroundImage: 'url(/images/auth.jpg)',
    color: '#fff',
    textAlign: 'center',
    padding: '50px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logo: {
    width: '60px',
    height: '60px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '25px',
    fontWeight: 'bold',
    margin: '13px 0 0 0',
  },
  subtitle: {
    fontSize: '16px',
    marginTop: '10px',
  },
  rightSection: {
    width: '60%',
    backgroundColor: '#fff',
    padding: '50px 40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  home: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: '28px',
    left: '25px',
    padding: '0',
  },
  arrow: {
    width: '24px',
    height: '24px',
  },
};

export default AuthPage;
