import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { allCourses } from '../data/dummyCourses';


const SearchResult = () => {
  const location = useLocation();
  const keyword = location.state?.keyword?.toLowerCase() || '';

  const results = allCourses.filter(course =>
    course.title.toLowerCase().includes(keyword) ||
    course.tag?.some(tag => tag.toLowerCase().includes(keyword))
  );

  return (
    <section style={{ width: '100vw', margin: '50px 0' }}>
      <div style={{ padding: '86px 20px 40px', maxWidth: '1270px', margin: '0 auto' }}>
        <h2>
          <strong style={{ color: 'rgb(32, 32, 32)', marginRight: '7px' }}>
            {keyword}
          </strong> 
          <span style={{ color: '#9e9e9e', fontSize: '21px' }}>검색 결과</span> 
        </h2> 

        <p style={{
          fontSize: '18px',
          fontWeight: 'bold',
          margin: '40px 0 20px',
          color: 'rgb(32, 32, 32)'
        }}>
          총 {results.length}개
        </p>

        {/* 카드 리스트 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '60px 20px',
          }}
        >
          {results.map(course => (
            <Link
              key={course.id}
              to={`/courses/${encodeURIComponent(course.title)}`}
              state={course}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                style={{
                  width: '226px',
                  height: '280px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  position: 'relative'
                }}
                onMouseEnter={e => {
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.07)';
                }}
                onMouseLeave={e => {
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                {/* 이미지 영역 */}
                <div
                  style={{
                    width: '100%',
                    height: '140px',
                    overflow: 'hidden',
                    borderRadius: '10px'
                  }}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    style={{
                      width: '100%',
                      height: '140px',
                      objectFit: 'cover',
                      transition: 'transform 0.3s',
                    }}
                  />
                </div>

                {/* 텍스트 콘텐츠 */}
                <div style={{ padding: '5px 0' }}>
                  {/* 태그 */}
                  {course.tag && (
                    <div style={{ display: 'flex', gap: '7px', margin: '7px 0' }}>
                      {course.tag.map((t, i) => (
                        <span
                          key={i}
                          style={{
                            color: '#787878',
                            borderRadius: '5px',
                            fontSize: '12.5px',
                            fontWeight: '600',
                            padding: '4px 11px',
                            backgroundColor: '#ededed',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 제목 */}
                  <h3 style={{ fontSize: '14px', fontWeight: '400', margin: '9px 0 0 0' }}>
                    {course.title}
                  </h3>

                  {/* 가격 */}
                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '7px',
                    }}
                  >
                    <span style={{ color: '#D45757', marginRight: '6px' }}>{course.discount}</span>
                    <span
                      style={{
                        fontSize: '12px',
                        textDecoration: 'line-through',
                        color: '#aaa',
                        marginRight: '8px',
                      }}
                    >
                      {course.originalPrice}
                    </span>
                    {course.price}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
