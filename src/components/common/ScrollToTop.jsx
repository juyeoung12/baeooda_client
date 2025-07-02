import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 렌더링이 끝나고 약간의 딜레이 후 스크롤
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50); // 50~100ms 정도가 적당

    return () => clearTimeout(timeout); // 클린업
  }, [pathname]);

  return null;
};

export default ScrollToTop;
