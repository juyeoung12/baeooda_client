import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    verificationCode: '',
    username: '',
    password: '',
    confirmPassword: '',
    profileImage: '',
  });

  const [emailSent, setEmailSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [codeSubmitted, setCodeSubmitted] = useState(false);
  const [showDomainList, setShowDomainList] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [emailButtonDisabled, setEmailButtonDisabled] = useState(false);
  const [codeButtonDisabled, setCodeButtonDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailDomains = ['gmail.com', 'naver.com', 'daum.net', 'kakao.com', 'hanmail.net', 'nate.com'];
  const dropdownRef = useRef(null);
  const emailInputRef = useRef(null);

  const randomImages = [
    '/icons/loginprofil1.svg',
    '/icons/loginprofil2.svg',
    '/icons/loginprofil3.svg',
  ];

  useEffect(() => {
    const random = Math.floor(Math.random() * randomImages.length);
    setFormData((prev) => ({ ...prev, profileImage: randomImages[random] }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if ((name === 'confirmPassword' || name === 'password') && formData.confirmPassword) {
      setPasswordMatch(
        name === 'confirmPassword'
          ? value === formData.password
          : formData.confirmPassword === value
      );
    }

    if (name === 'email') {
      setShowDomainList(value.includes('@'));
      setHighlightedIndex(-1);
    }
  };

  const handleDomainSelect = (domain) => {
    const [localPart] = formData.email.split('@');
    setFormData((prev) => ({ ...prev, email: `${localPart}@${domain}` }));
    setShowDomainList(false);
    setHighlightedIndex(-1);
    emailInputRef.current.focus();
  };

  const handleKeyDown = useCallback((e) => {
    const active = document.activeElement.name;

    if (showDomainList && ['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
      e.preventDefault();
      if (e.key === 'ArrowDown') {
        setHighlightedIndex((prev) => (prev + 1) % emailDomains.length);
      } else if (e.key === 'ArrowUp') {
        setHighlightedIndex((prev) => (prev - 1 + emailDomains.length) % emailDomains.length);
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        handleDomainSelect(emailDomains[highlightedIndex]);
      }
    } else if (e.key === 'Enter') {
      if (active === 'email' && formData.email.includes('@')) {
        document.getElementById('email-send-btn')?.click();
      } else if (active === 'verificationCode' && formData.verificationCode.trim()) {
        document.getElementById('code-verify-btn')?.click();
      } else if (active === 'confirmPassword' && passwordMatch) {
        document.getElementById('submit-btn')?.click();
      }
    }
  }, [formData, highlightedIndex, passwordMatch, showDomainList]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDomainList(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const activeItem = document.querySelector(`#dropdown-item-${highlightedIndex}`);
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  const handleEmailSend = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/email/send`, {
        email: formData.email,
      });
      alert(res.data?.message || '인증번호 전송 완료');
      setEmailSent(true);
      setEmailButtonDisabled(true);
      setCodeVerified(false);
      setCodeButtonDisabled(false);
      setCodeSubmitted(false);
      setFormData((prev) => ({ ...prev, verificationCode: '' }));

      setTimeout(() => setEmailButtonDisabled(false), 60000);
    } catch (err) {
      console.error('❌ 인증번호 전송 실패:', err);
      alert(err.response?.data?.message || '인증번호 전송 실패');
    }
  };

  const handleCodeVerify = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/email/verify`, {
        email: formData.email,
        code: formData.verificationCode
      });
      alert(res.data?.message || '인증 성공');
      setCodeVerified(true);
      setCodeButtonDisabled(true);
      setTimeout(() => setCodeSubmitted(false), 1000);
    } catch (err) {
      console.error('❌ 인증 실패:', err);
      alert(err.response?.data?.message || '인증 실패');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, formData);
      alert('회원가입이 완료되었습니다!');
      navigate('/auth?mode=login');
    } catch (err) {
      alert(err.response?.data?.message || '회원가입에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.includes('@') &&
    codeVerified &&
    formData.username.trim() &&
    formData.password &&
    passwordMatch;

  return (
    <div style={{ maxWidth: '320px', margin: '0 auto', fontFamily: 'sans-serif', position: 'relative' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '18px' }}>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="이름*" value={formData.name} onChange={handleChange} required style={inputStyle} autoComplete="off" />
        <div style={{ display: 'flex', gap: '5px', position: 'relative' }}>
          <input ref={emailInputRef} type="text" name="email" placeholder="이메일*" value={formData.email} onChange={handleChange} required autoComplete="off" style={{ ...inputStyle, width: '210px' }} />
          <button id="email-send-btn" type="button" onClick={handleEmailSend} disabled={!formData.email.includes('@') || emailButtonDisabled} style={createButtonStyle(formData.email.includes('@') && !emailButtonDisabled)}>인증번호 전송</button>
          {showDomainList && (
            <ul ref={dropdownRef} style={dropdownStyle} tabIndex={0}>
              {emailDomains.map((domain, index) => (
                <li key={domain} id={`dropdown-item-${index}`} onClick={() => handleDomainSelect(domain)} style={{ ...dropdownItemStyle, backgroundColor: highlightedIndex === index ? '#eee' : 'transparent' }}>
                  {`${formData.email.split('@')[0]}@${domain}`}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div style={{ display: 'flex', gap: '5px' }}>
          <input type="text" name="verificationCode" placeholder="인증번호*" value={formData.verificationCode} onChange={handleChange} style={{ ...inputStyle, width: '210px' }} />
          <button id="code-verify-btn" type="button" onClick={handleCodeVerify} disabled={!formData.verificationCode.trim() || codeButtonDisabled || codeSubmitted} style={createButtonStyle(formData.verificationCode.trim() && !codeButtonDisabled && !codeSubmitted)}>인증번호 확인</button>
        </div>
        <input type="text" name="username" placeholder="아이디*" value={formData.username} onChange={handleChange} style={inputStyle} />
        <input type="password" name="password" placeholder="비밀번호*" value={formData.password} onChange={handleChange} style={inputStyle} />
        <input type="password" name="confirmPassword" placeholder="비밀번호 확인*" value={formData.confirmPassword} onChange={handleChange} style={inputStyle} />
        {formData.confirmPassword && passwordMatch === false && (
          <p style={{ color: '#E45547', fontSize: '13px', margin: '6px 0 0 4px' }}>비밀번호와 비밀번호 확인이 일치하지 않습니다.</p>
        )}
        {formData.confirmPassword && passwordMatch === true && (
          <p style={{ color: '#4C779F', fontSize: '13px', margin: '6px 0 0 4px' }}>비밀번호가 일치합니다.</p>
        )}
        <button id="submit-btn" type="submit" disabled={!isFormValid || isSubmitting} style={{ ...ButtonStyle, backgroundColor: isFormValid ? '#ED6051' : '#ccc', marginTop: '16px', cursor: isFormValid ? 'pointer' : 'not-allowed' }}>가입하기</button>
      </form>
      <div style={{ display: 'flex', gap: '6px', marginTop: '8px', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ color: 'rgb(153, 153, 153)', fontSize: '13.5px', margin: '5px 0 0 0' }}>이미 가입된 계정이 있으신가요?</p>
        <button type="button" onClick={() => navigate('/auth?mode=login')} style={{ color: 'rgb(106, 109, 117)', fontSize: '13.5px', fontWeight: 'bold', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: '0', height: '20px' }}>
          로그인
        </button>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  height: '42px',
  marginBottom: '10px',
  padding: '0 12px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '14px',
  boxSizing: 'border-box',
};

const baseButtonStyle = {
  padding: '12px 0',
  fontSize: '14px',
  // fontWeight: 'bold',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  height: '45px',
  cursor: 'pointer',
  width: '100%',
};

const ButtonStyle = {
  padding: '13px 0',
  fontSize: '17px',
  borderRadius: '6px',
  color: '#fff',
  border: 'none',
  width: '100%',
}

const createButtonStyle = (isEnabled) => ({
  ...baseButtonStyle,
  backgroundColor: isEnabled ? '#ED6051' : '#ccc',
  cursor: isEnabled ? 'pointer' : 'not-allowed',
});

const dropdownStyle = {
  position: 'absolute',
  top: '44px',
  left: 0,
  width: '210px',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '4px',
  zIndex: 10,
  maxHeight: '150px',
  overflowY: 'auto',
  padding: 0,
  margin: 0,
  listStyle: 'none',
};

const dropdownItemStyle = {
  padding: '8px 12px',
  cursor: 'pointer',
  fontSize: '14px',
};

export default SignupForm;
