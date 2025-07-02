import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { bestCourses } from '../../data/homeCourses'; // ✅

const courseCards = bestCourses;


// 카테고리 배열
const categories = ['IT·디지털', '비즈니스·경제', '생활·실무', '예술·교양'];

const BestSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('IT·디지털');

  return (
    <section>
      <h2 style={{ margin: '0 0 25px 0', fontSize: '22px' }}>이번주 TOP5</h2>

      <div
        style={{
          width: '1350px',
          maxWidth: '1350px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          minHeight: '290px',
          justifyContent: 'center',
          boxSizing: 'border-box',
          overflow: 'hidden',
          backgroundColor: 'rgb(255, 255, 255)'
        }}
      >
        <div
          style={{
            minWidth: '140px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: '5px'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '18px 20px',
                border: 'none',
                background: selectedCategory === cat ? '#717171' : 'white',
                color: selectedCategory === cat ? 'white' : '#717171',
                fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                fontSize: '15px',
                textAlign: 'center',
                borderRadius: '8px',
                cursor: 'pointer',
                outline: 'none',
                transition: 'color 0.18s, border 0.18s',
                height: '30px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            gap: '24px',
            minWidth: '0'
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: '12px',
              maxWidth: '800px',
              justifyContent: 'flex-start'
            }}
          >
            {bestCourses[selectedCategory]?.slice(0, 5).map((item, idx) => (
              <Link
                key={item.id}
                to={`/courses/${encodeURIComponent(item.title)}`}
                state={{
                  desc: item.desc,
                  image: item.image,
                  detailImage: item.detailImage,
                  listImage: item.listImage,
                  level: item.info.level,
                  day: item.info.day,
                  time: item.info.time,
                  price: item.price,
                  originalPrice: item.originalPrice,
                  discount: item.discount
                }}
              >
                <div
                  style={{
                    width: '260px',
                    minWidth: '190px',
                    height: '324px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 2px 12px rgba(85,132,176,0.12)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    const bg = e.currentTarget.querySelector('.bg-img');
                    if (bg) bg.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e) => {
                    const bg = e.currentTarget.querySelector('.bg-img');
                    if (bg) bg.style.transform = 'scale(1)';
                  }}
                >
                  <div
                    className="bg-img"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.4s ease',
                      zIndex: 1
                    }}
                  />

                  <div
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      width: '100%',
                      height: '100%',
                      padding: '16px 16px 12px 16px',
                      background:
                        'linear-gradient(0deg, rgba(62, 62, 62, 0.31) 75%, rgba(68, 68, 68, 0.09) 100%)',
                      color: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      boxSizing: 'border-box',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 500,
                        fontSize: '12px',
                        marginBottom: '13px'
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        whiteSpace: 'pre-line',
                        fontSize: '16px',
                        lineHeight: 1.4,
                        letterSpacing: '-0.3px',
                        fontWeight: 600,
                        textAlign: 'center'
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSection;
