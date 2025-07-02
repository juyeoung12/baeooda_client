// ✅ 수정된 CourseList.jsx with 스타일 반영
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { dummyCourses, allCourses } from '../data/dummyCourses';


// 그리고 사용 시에도 일치하도록
console.log(allCourses);


const CourseList = () => {
  const { main, sub } = useParams();

  // 1. 슬러그 → 한글 매핑
  const slugToMainCategory = {
    it: 'IT·디지털',
    biz: '비즈니스·경제',
    life: '생활·실무',
    art: '예술·교양',
  };

  const mainCategory = slugToMainCategory[main];
  const decodedSub = decodeURIComponent(sub);

  // 2. 필터링
  const filteredCourses = allCourses.filter(
    (course) =>
      course.mainCategory === mainCategory &&
      course.subCategory === decodedSub
  );

  // 3. 서브카테고리 목록 구성
  const subCategories = [
    ...new Set(
      allCourses
        .filter((course) => course.mainCategory === mainCategory)
        .map((course) => course.subCategory)
    ),
  ];

  if (!mainCategory || !decodedSub) return <div>잘못된 카테고리입니다.</div>;

  return (
    <section style={{ width: '100vw', margin: '120px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '1270px', margin: '0 auto' }}>
        {/* 사이드 메뉴 */}
        <aside style={{ width: '210px', marginRight: '64px' }}>
          <div style={{
            background: 'linear-gradient(to right, #84A1BD 38%, #83A7BF, #80B8C8 100%)',
            fontSize: '19px',
            fontWeight: 'bold',
            padding: '17px 28px',
            color: 'white'
          }}>
            {mainCategory}
          </div>
          <ul style={{
            border: '1px solid #E6E6E6',
            borderTop: 'none',
            margin: 0,
            padding: 0
          }}>
           {subCategories.map((subItem, i) => (
              <Link
                key={i}
                to={`/courses/${main}/${encodeURIComponent(subItem)}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <li
                  style={{
                    listStyle: 'none',
                    padding: '15px 24px',
                    fontWeight: subItem === decodedSub ? 'bold' : 'normal',
                    color: subItem === decodedSub ? '#3A6A92' : '#B7B7B7',
                    cursor: 'pointer',
                    fontSize: '15px',
                  }}
                >
                  {subItem}
                  {subItem === decodedSub && (
                    <span style={{ color: '#3A6A92' }}> ({filteredCourses.length})</span>
                  )}
                </li>
              </Link>
            ))}
          </ul>
        </aside>

        {/* 강의 리스트 */}
        <main style={{ flexGrow: 1 }}>

          <div style={{ display: 'flex', justifyContent: 'end', fontSize: '14px', gap: '15px', marginBottom: '20px'}}>
            <button style={{ backgroundColor: 'transparent', padding: '0' }}>최신순</button>
            <button style={{ backgroundColor: 'transparent', padding: '0', color: '#ADADAD' }}>인기순</button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '30px 30px',
              width: '900px'
            }}
          >
            {filteredCourses.map((course, i) => (
              <Link
                key={course.id}
                to={{
                  pathname: `/courses/${encodeURIComponent(course.title)}`,
                  state: {
                    desc: course.desc,
                    detailImage: course.detailImage
                  }
                }}
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
                  <div
                    style={{
                      width: '100%',
                      height: '140px',
                      overflow: 'hidden',
                      borderRadius: '10px'
                    }}>
                    <img
                      src={course.listImage || course.image}
                      alt={course.title}
                      style={{
                        width: '100%',
                        height: '140px',
                        objectFit: 'cover',
                        transition: 'transform 0.3s',
                      }}
                    />
                  </div>

                  <div style={{ padding: '5px 0' }}>
                    {course.tag && (
                      <div style={{ display: 'flex', gap: '7px', margin: '7px 0' }}>
                        {course.tag.map((t, idx) => (
                          <span
                            key={idx}
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
                    <h3 style={{ fontSize: '14px', fontWeight: '400', margin: '9px 0 0 0' }}>
                      {course.title}
                    </h3>

                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '7px'
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
        </main>
      </div>
    </section>
  );
};

export default CourseList;