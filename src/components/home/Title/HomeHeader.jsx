import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../../contexts/UserContext';

const HomeHeader = () => {
  const { user, logout } = useUser();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // 장바구니 개수 로딩
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(storedCart.length);
  }, []);

  // 외부 클릭 시 프로필 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        {/* 왼쪽 - 로고와 메뉴 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <Link to="/">
            <img src="/logo.svg" alt="Logo" style={{ height: '23px' }} />
          </Link>
          <nav>
            <ul style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {['🎉오픈특가', '베스트', '신규', '오픈예정'].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to="/event"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'black',
                      fontSize: '16px',
                      cursor: 'pointer',
                      padding: '12px',
                      fontWeight: 'normal',
                      textDecoration: 'none',
                    }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* 오른쪽 - 로그인/회원가입 또는 프로필 */}
        <AuthLinks>
          {/* 장바구니 아이콘 + 뱃지 */}
          <div style={{ position: 'relative', marginRight: '10px', top: '3px' }}>
            <Link to="/cart" style={{ display: 'inline-block' }}>
              <img src="/icons/cart.svg" alt="장바구니" style={{ width: '26px', height: '26px' }} />
            </Link>
            {cartCount > 0 && (
              <div style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                backgroundColor: '#ff5722',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '12px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {cartCount}
              </div>
            )}
          </div>

          {user ? (
            <>
              <div ref={profileRef} style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setShowProfileMenu(prev => !prev)}
                  style={{
                    width: '36px',
                    height: '36px',
                    border: 'none',
                    backgroundImage: `url(${user.profileImage})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
                {showProfileMenu && (
                  <div style={{
                    position: 'absolute',
                    top: '48px',
                    right: 0,
                    width: '220px',
                    background: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    padding: '12px',
                    zIndex: 999
                  }}>
                    <div style={{ paddingBottom: '8px', borderBottom: '1px solid #ddd', marginBottom: '8px' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '4px' }}>
                        {user.nickname || user.name || user.username}
                      </div>
                      {user.email && (
                        <div style={{ fontSize: '13px', color: '#888' }}>{user.email}</div>
                      )}
                    </div>
                    <Link to="/profile" style={menuItemStyle}>마이페이지</Link>
                    <button
                      onClick={logout}
                      style={{
                        ...menuItemStyle,
                        border: 'none',
                        background: 'none',
                        color: '#f54343',
                        textAlign: 'left',
                        width: '100%'
                      }}>
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '7px' }}>
              <StyledLink to="/auth?mode=login">로그인</StyledLink>
              <StyledLink to="/auth?mode=terms" style={{
                background: '#595a5c',
                color: 'white',
                borderRadius: '50px'
              }}>
                회원가입
              </StyledLink>
            </div>
          )}
        </AuthLinks>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 1001;
  border-bottom: 1px solid #eee;
`;

const HeaderContent = styled.div`
  height: 58px;
  max-width: 1350px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthLinks = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  font-size: 14px;
  color: black;
  text-decoration: none;
  padding: 5px 15px;

  &:hover {
    text-decoration: underline;
  }
`;

const menuItemStyle = {
  display: 'block',
  padding: '8px 12px',
  fontSize: '14px',
  color: '#333',
  textDecoration: 'none',
  cursor: 'pointer'
};

export default HomeHeader;
