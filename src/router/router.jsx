import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from '../components/common/ScrollToTop';
import DefaultLayout from '../layouts/DefaultLayout';
import Home from '../pages/Home';
import CourseList from '../pages/CourseList';
import CoursedetailPage from '../pages/CoursedetailPage.jsx';
import SearchResult from '../pages/SearchResult.jsx';
import CartPage from '../pages/CartPage';
import Profile from '../pages/Profile';
import KakaoRedirect from '../pages/oauth/KakaoRedirect';
import NaverRedirect from '../pages/oauth/NaverRedirect';
import GoogleRedirect from '../pages/oauth/GoogleRedirect';
import AuthPage from '../pages/Auth/AuthPage'; // ✅ 새로 만든 통합 페이지

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* 홈은 헤더 없이 단독 */}
        <Route path="/" element={<Home />} />

        {/* 소셜 로그인 리디렉트 처리 */}
        <Route path="/oauth/kakao" element={<KakaoRedirect />} />
        <Route path="/oauth/naver" element={<NaverRedirect />} />
        <Route path="/oauth/google" element={<GoogleRedirect />} />

        {/* 로그인 관련 폼을 하나의 페이지로 */}
        <Route path="/auth" element={<AuthPage />} />

        {/* 레이아웃 포함 페이지들 */}
        <Route element={<DefaultLayout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/Search" element={<SearchResult />} />
          <Route path="/CourseList" element={<CourseList />} />
          <Route path="/courses/:main/:sub" element={<CourseList />} />
          <Route path="/courses/:title" element={<CoursedetailPage />} />
          <Route path="/Cart" element={<CartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
