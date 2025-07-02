// 연결페이지 기본 레이아웃
// src/layout/DefaultLayout.jsx

import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Aside from '../components/common/Aside'
import { useState } from 'react';

const DefaultLayout = () => {
  const [selectedMainCategory, setSelectedMainCategory] = useState('IT·디지털');
  const [selectedSubCategory, setSelectedSubCategory] = useState('프로그래밍');

  return (
    <>
      <Header
        setSelectedMainCategory={setSelectedMainCategory}
        setSelectedSubCategory={setSelectedSubCategory}
      />
      <div className="home-wrapper" >
        <Outlet context={{
          selectedMainCategory,
          selectedSubCategory,
          setSelectedMainCategory,
          setSelectedSubCategory
        }} />
        <Aside />
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;

