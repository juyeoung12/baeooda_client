// ✅ 수정된 Category.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const monitor = '/icons/monitor.svg';
const movie = '/icons/movie.svg';
const square_foot = '/icons/square_foot.svg';
const smart_toy = '/icons/smart_toy.svg';

const itImg = '/images/it_img_1.jpg';
const bnImg = '/images/bn_img_1.jpg';
const prImg = '/images/pr_img_1.jpg';
const artImg = '/images/art_img_1.jpg';

const maskMap = {
  'IT·디지털': '/category_box_1.png',
  '비즈니스·경제': '/category_box_2.png',
  '생활·실무': '/category_box_3.png',
  '예술·교양': '/category_box_4.png',
};

const allCourses = {
  'IT·디지털': [
    { title: '프로그래밍', icon: monitor },
    { title: '사진/영상', icon: movie },
    { title: '디자인/3D', icon: square_foot },
    { title: 'AI·인공지능', icon: smart_toy },
  ],
  '비즈니스·경제': [
    { title: '마케팅 입문', icon: monitor },
    { title: '경영 전략', icon: movie },
    { title: '파이낸스 기초', icon: square_foot },
    { title: '창업 전략', icon: smart_toy },
  ],
  '생활·실무': [
    { title: '컴퓨터 활용능력', icon: monitor },
    { title: '자격증 준비', icon: movie },
    { title: '실무 문서 작성법', icon: square_foot },
    { title: '업무 자동화', icon: smart_toy },
  ],
  '예술·교양': [
    { title: '글쓰기', icon: monitor },
    { title: '캘리그라피', icon: movie },
    { title: '음악', icon: square_foot },
    { title: '타로/사주', icon: smart_toy },
  ],
};

const mainCategorySlugMap = {
  'IT·디지털': 'it',
  '비즈니스·경제': 'biz',
  '생활·실무': 'life',
  '예술·교양': 'art',
};

const commonCourses = {
  'IT·디지털': {
    title: '코딩 기초와 웹 프로그래밍',
    slug: 'programming',
    image: itImg,
    description: '코딩은 도전이 아니라 필수입니다.',
  },
  '비즈니스·경제': {
    title: '비즈니스의 기본을 다지다',
    slug: 'marketing',
    image: bnImg,
    description: '전략적 사고와 실무 감각 향상',
  },
  '생활·실무': {
    title: '현장에서 통하는 실무 스킬',
    slug: 'license',
    image: prImg,
    description: '지금 바로 활용 가능한 업무 노하우',
  },
  '예술·교양': {
    title: '쉽게 배우는 캘리그라피',
    slug: 'calligraphy',
    image: artImg,
    description: '손글씨로 마음을 전하는 예술',
  },
};

const Category = () => {
  const [category, setCategory] = useState('IT·디지털');
  const categories = Object.keys(allCourses);
  const courseItems = allCourses[category] || [];
  const adCard = commonCourses[category];
  const mainSlug = mainCategorySlugMap[category];

  return (
    <div style={{ position: 'relative', width: '1350px' }}>
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          left: '-24px',
          width: '1397px',
          height: '435px',
          backgroundImage: `url('${maskMap[category]}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          zIndex: 1,
        }}
      ></div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                width: '191px',
                marginTop: '17px',
                borderBottom: 'none',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                backgroundColor: 'transparent',
                color: category === cat ? '#5094B4' : '#81A0BE',
                fontWeight: category === cat ? 'bold' : '500',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          style={{
            padding: '0 14px',
            gap: '10px',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            position: 'relative',
            top: '17px',
          }}
        >
          {courseItems.map((item) => (
            <Link
              key={item.title}
              to={`/courses/${mainSlug}/${encodeURIComponent(item.title)}`}
              style={{
                width: '100%',
                height: '290px',
                background: 'linear-gradient(to bottom, #42B2BB 2%, #5584B0 95%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '20px',
                fontSize: '19px',
                color: 'white',
                position: 'relative',
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.3)';
                e.currentTarget.style.background = 'linear-gradient(to bottom, #2D6C83 5%, #3F5F85 95%)';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'linear-gradient(to bottom, #42B2BB 2%, #5584B0 95%)';
              }}
            >
              <img
                src={item.icon}
                alt={item.title}
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'contain',
                  padding: '6px',
                  marginBottom: '12px',
                  transition: 'transform 0.4s',
                }}
              />
              <span>{item.title}</span>
            </Link>
          ))}

          {adCard && (
            <Link
              to={`/courses/${mainSlug}/${adCard.slug}`}
              style={{
                width: '100%',
                height: '290px',
                backgroundImage: `url(${adCard.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                textDecoration: 'none',
                color: 'white',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <h3 style={{ fontSize: '14px', fontWeight: 'bold' }}>{adCard.title}</h3>
                <p style={{ fontSize: '12px', marginTop: '4px' }}>{adCard.description}</p>
                <button
                  style={{
                    fontSize: '12px',
                    marginTop: '8px',
                    padding: '4px 10px',
                    backgroundColor: '#fff',
                    color: '#000',
                    borderRadius: '999px',
                    width: 'fit-content',
                  }}
                >
                  더보기 +
                </button>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
