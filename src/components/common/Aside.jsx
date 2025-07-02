import React, { useEffect, useState } from 'react';

const Aside = () => {
  const [show, setShow] = useState(false);

  const handleScroll = () => {
    setShow(window.scrollY > 200); // 200px 넘으면 보임
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <button
      onClick={handleScrollToTop}
      style={{
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        padding: '10px 16px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#fff',
        border: 'none',
        boxShadow: 'rgba(78, 124, 194, 0.36) 0px 1px 6px 1px',
        cursor: 'pointer',
        zIndex: 9999,
        width: '43px',
        height: '43px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        borderRadius: '50%',
      }}
    >
        <svg width="24" height="31" viewBox="0 0 24 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.3291 1.50488L22.3291 9.50488L23.8232 10.834L21.166 13.8232L19.6709 12.4951L14 7.45312V31H10V7.45312L4.3291 12.4951L2.83398 13.8232L0.176758 10.834L1.6709 9.50488L10.6709 1.50488L12 0.324219L13.3291 1.50488Z" fill="#4E7CC2"/>
        </svg>

    </button>
  );
};

export default Aside;
