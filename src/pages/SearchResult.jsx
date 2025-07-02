import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { allCourses } from '../data/dummyCourses';

const SearchResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const keyword = location.state?.keyword?.toLowerCase() || '';

  useEffect(() => {
    if (!location.state?.keyword) {
      navigate('/');
    }
  }, [location, navigate]);

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
                  height: '270px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '5px 0',
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
                <div
                  style={{
                    width: '100%',
                    height: '140px',
                    overflow: 'hidden',
                    borderRadius: '10px',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={course.listImage || course.image}
                    alt={course.title}
                    style={{
                      width: '100%',
                      height: '140px',
                      objectFit: 'cover',
                      transition: 'transform 0.3s',
                      flexShrink: 0,
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between', marginTop: '10px' }}>
                  <div>
                    {course.tag && (
                      <div style={{ display: 'flex', gap: '7px', marginBottom: '6px' }}>
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
                    <h3 style={{ fontSize: '14px', fontWeight: '400', margin: '5px 0' }}>
                      {course.title}
                    </h3>
                  </div>

                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '6px'
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
                      {course.options?.['1년 수강']?.original}
                    </span>
                    <span>{course.options?.['1년 수강']?.sale}</span>
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
