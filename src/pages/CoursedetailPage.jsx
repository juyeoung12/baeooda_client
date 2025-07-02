import React, { useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { allCourses } from '../data/dummyCourses'; // ✅ named import

const iconMenuList = [
  {
    label: '미리보기',
    icon: '/icons/d_preview.svg',
    action: () => setIsModalOpen(true),
  },
  {
    label: '찜하기',
    icon: '/icons/d_heart.svg',
    action: () => alert('찜하기 기능은 준비 중입니다.'),
  },
  {
    label: '공유하기',
    icon: '/icons/d_share.svg',
    action: () => {
      const currentUrl = window.location.href;
      navigator.clipboard.writeText(currentUrl)
        .then(() => setIsShareModalOpen(true))
        .catch(err => {
          console.error('링크 복사 실패:', err);
          alert('링크 복사에 실패했습니다.');
        });
    },
  }
];


const CoursedetailPage = () => {
  const [activeTab, setActiveTab] = useState('intro');
  const { title } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('1년 수강');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const introRef = useRef(null);
  const curriculumRef = useRef(null);

const course = allCourses.find((c) => c.title === title);
const { desc, detailImage: stateDetailImage } = location.state || {};
const overlaySub = location.state?.overlaySub || course?.author;
  const actualDetailImage = stateDetailImage || course?.detailImage || course?.image || '/images/default.jpg';
  const { level, day } = course?.info || {};
  const options = course?.options || {};
  const author = course?.author || '강사명';
  const overlayTitle = course?.title;

  const scrollTo = (ref) => {
    if (!ref.current) return;
    const yOffset = -80;
    const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!course) {
      alert('강의 정보를 찾을 수 없습니다.');
      return;
    }

    const alreadyExists = cart.some((item) => item.id === course.id && item.option === selectedOption);
    if (alreadyExists) {
      alert('이미 장바구니에 담긴 강의입니다.');
      return;
    }

    const newItem = {
      id: course.id,
      option: selectedOption,
      price: options?.[selectedOption]?.sale || 0,
      listImage: course.listImage || course.imageList?.[0] || course.image,
    };

    localStorage.setItem('cart', JSON.stringify([...cart, newItem]));
    window.dispatchEvent(new Event('cartUpdated'));
    setIsCartModalOpen(true);
  };


  return (
    <section style={{ width: '100vw', margin: '70px 0' }}>
      <div style={{ maxWidth: '1270px', margin: '0 auto', padding: '60px 20px 40px', display: 'flex', gap: '40px', position: 'relative' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', color: '#222' }}>
          <div style={{ borderRadius: '10px', overflow: 'hidden', marginBottom: '40px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '410px',
                backgroundImage: `url(${actualDetailImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
            {/* {(desc || course?.desc) && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '43%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: '#fff',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                  textAlign: 'center',
                }}
              >
                {desc || course?.desc}
              </div>
            )} */}

          </div>
            <div style={{ display: 'flex', justifyContent: 'end', gap: '24px', fontSize: '16px', backgroundColor: '#fff', borderTop: '1px solid #eee', height: '66px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '0 40px', fontSize: '16px', backgroundColor: '#fff', borderTop: '1px solid #eee', height: '66px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                  <img src={`/icons/level${level === '초급' ? 1 : level === '중급' ? 2 : level === '고급' ? 3 : 1}.svg`} alt="레벨 아이콘" style={{ width: '20px', height: '20px', marginBottom: '2px' }} />
                  {/* <span style={{ fontSize: '14px' }}>난이도</span> */}
                  <span style={{ fontSize: '14px', color: '#666666' }}>{level || '정보 없음'}</span>
                </div>

                <div style={{ color: '#ccc', fontSize: '16px' }}>ㅣ </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                  <img src="/icons/time.svg" alt="소요시간 아이콘" style={{ width: '20px', height: '20px' }} />
                  {/* <span style={{ fontSize: '14px' }}>소요 시간</span> */}
                  <span style={{ fontSize: '14px', color: '#666666' }}>{day || '정보 없음'}</span>
                </div>

              </div>
            </div>
          </div>

      {/* // 탭 메뉴 렌더링 */}
    <div style={{ display: 'flex', gap: '32px', margin: '60px 0', fontSize: '16px' }}>
      <span
        onClick={() => {
          scrollTo(introRef);
          setActiveTab('intro');
        }}
        style={{
          fontWeight: 'bold',
          cursor: 'pointer',
          borderBottom: activeTab === 'intro' ? '4px solid #878787' : 'none',
          paddingBottom: '4px',
        }}
      >
        강의 소개
      </span>
      <span
        onClick={() => {
          scrollTo(curriculumRef);
          setActiveTab('curriculum');
        }}
        style={{
          fontWeight: 'bold',
          cursor: 'pointer',
          borderBottom: activeTab === 'curriculum' ? '4px solid #878787' : 'none',
          paddingBottom: '4px',
        }}
      >
        커리큘럼
      </span>
    </div>

          {/* 강의 개요 */}
          <section ref={introRef} style={{ marginBottom: '60px' }}>
            <h2 style={sectionTitleStyle}>강의 개요</h2>
            <div style={boxStyle}>
              <p><span style={dotstyle}>●</span> 인공지능과 데이터 분석을 처음 접하는 분도 쉽게 이해할 수 있도록, 실습을 중심으로 AI 개발 과정을 차근차근 안내합니다.</p>
              <p><span style={dotstyle}>●</span> 기초 파이썬부터 데이터 정제·분석, 자연어 처리와 생성형 AI의 원리, 최신 ChatGPT API를 이용한 애플리케이션 제작까지 한 코스에 담았습니다.</p>
              <p><span style={dotstyle}>●</span> 강의 후에는 실생활에 적용 가능한 AI 서비스 기획과 구현까지 직접 경험할 수 있습니다.</p>
            </div>
          </section>

          {/* 강의 특징 */}
          <section style={{ marginBottom: '60px' }}>
            <h2 style={sectionTitleStyle}>강의 특징</h2>
            <div style={boxStyle}>
              <p><span style={dotstyle2}>●</span> 처음 시작하는 누구라도 쉽게 따라올 수 있는 입문 최적화 구성</p>
              <p><span style={dotstyle2}>●</span> 직접 손으로 해보며 익히는 실습형 강의</p>
              <p><span style={dotstyle2}>●</span> 실무에 곧바로 활용 가능한 데이터 처리·AI 개발 역량 강화</p>
              <p><span style={dotstyle2}>●</span> 최신 AI 기술과 오픈소스 활용까지 폭넓게 반영</p>
              <p><span style={dotstyle2}>●</span> 나만의 인공지능 프로젝트를 완성하며 성취감을 느낄 수 있음</p>
            </div>
          </section>

          {/* 추천 수강 대상 */}
          <section style={{ marginBottom: '60px' }}>
            <h2 style={sectionTitleStyle}>추천 수강 대상</h2>
            <div style={boxStyle}>
              <p><span style={dotstyle2}>●</span> 실습을 통해 인공지능/데이터 분석을 처음부터 체계적으로 배우고 싶은 분</p>
              <p><span style={dotstyle2}>●</span> 이론보다 실제 AI 프로젝트를 만들어보고 싶은 분</p>
              <p><span style={dotstyle2}>●</span> 파이썬 및 데이터 처리 능력을 실전적으로 키우고 싶은 분</p>
              <p><span style={dotstyle2}>●</span> ChatGPT, 생성형 AI, 챗봇 등 최신 트렌드 활용법이 궁금한 분</p>
              <p><span style={dotstyle2}>●</span> 실무·취업·개인 프로젝트 등 다양한 목적으로 AI 역량이 필요한 분</p>
            </div>
          </section>

          {/* 커리큘럼 */}
            <section ref={curriculumRef} style={{ marginBottom: '60px' }}>
            <h2 style={sectionTitleStyle}>커리큘럼</h2>
            <div
              style={{
                boxShadow: 'rgb(225, 225, 225) 0px 0px 8px 1px',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {[
                  {
                    title: '1. 인공지능/파이썬 시작과 개발 환경',
                    badge: '미리보기',
                    desc: '인공지능 및 소개, IDE/코딩 사용법',
                    time: '12:50',
                  },
                  {
                    title: '2. 파이썬 기초 문법과 데이터 다루기',
                    desc: '파이썬 문법, 변수, 입력과 출력',
                    time: '10:00',
                  },
                  {
                    title: '3. 데이터베이스의 기본 통계',
                    desc: '데이터베이스, 상관관계, 통계',
                    time: '08:25',
                  },
                  {
                    title: '4. 데이터 분석 실습 (Pandas & 시각화)',
                    desc: '넘파이, 판다스, 데이터 시각화, 전처리, 분석',
                    time: '12:40',
                  },
                  {
                    title: '5. 자연어 처리 및 챗봇 실습',
                    desc: '자연어 처리, 챗봇 제작',
                    time: '11:20',
                  },
                  {
                    title: '6. ChatGPT/오픈AI를 활용한 앱 개발',
                    desc: 'ChatGPT API, 실리콘 트렌드, 자동화 응용',
                    time: '13:50',
                  },
                  {
                    title: '7. 프로젝트 및 실제 결과물',
                    desc: 'AI 앱 설계, 결과물 제출, 포트폴리오 정리',
                    time: '14:50',
                  }
                ].map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '20px',
                      borderBottom: '1px solid #eee',
                      gap: '10px',
                      fontSize: '14px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', flex: '2 0 auto', fontWeight: 600, color: '#2e2e2e' }}>
                      {item.title}
                      {item.badge && (
                        <span
                          style={{
                            backgroundColor: '#EAF7FA',
                            color: '#1B82A0',
                            fontSize: '10px',
                            padding: '3px 6px',
                            borderRadius: '6px',
                            marginLeft: '8px',
                            fontWeight: 700,
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        flex: '3 1 auto',
                        color: '#666',
                        fontSize: '13px',
                        textAlign: 'right',
                      }}
                    >
                      {item.desc}
                    </div>
                    <div
                      style={{
                        flex: '0 0 50px',
                        fontSize: '13px',
                        color: '#999',
                        textAlign: 'right',
                      }}
                    >
                      {item.time}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>


        {/* 오른쪽 수강 정보 카드 */}
        <aside
          style={{
            flex: 1,
            position: 'sticky',
            top: '130px',
            alignSelf: 'flex-start',
            maxWidth: '390px'
          }}>
          <div
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #D4D4D4',
              backgroundColor: '#fff',
              fontFamily: 'sans-serif',
              maxWidth: '390px',
              padding: '40px 34px',
              boxSizing: 'border-box',
            }}
          >
            <h2 style={{ fontSize: '19px', fontWeight: '600', margin: '0' }}>
              {title || '강의 제목'}
            </h2>
            <div style={{ fontSize: '14px', color: '#444', margin: '20px 0px 35px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/icons/loginprofil1.svg" alt="프로필사진" style={{ width: '25px', height: '25px', borderRadius: '50%' }} />
              {overlaySub || '강사명'}
            </div>

            {/* 가격 옵션 */}
            {['1년 수강', '무제한 수강'].map((optionKey) => {
              const option = options?.[optionKey];
              return (
                <button
                  key={optionKey}
                  onClick={() => setSelectedOption(optionKey)}
                  style={{
                    width: '100%',
                    padding: '17px 27px',
                    fontSize: '14px',
                    fontWeight: '500',
                    borderRadius: '8px',
                    border: selectedOption === optionKey ? '2px solid #ED6051' : '2px solid #ccc',
                    backgroundColor: selectedOption === optionKey ? '#FFF4EF' : '#fff',
                    marginBottom: '7px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize:'14.5px' }}>{optionKey}</span>
                    <span>
                      <span style={{ textDecoration: 'line-through', color: '#aaa', marginRight: '10px', fontWeight: '500' }}>
                        ₩{option?.original?.toLocaleString() || '0'}
                      </span>
                      <span style={{ color: '#000', fontSize:'15px', fontWeight: '600', }}>₩{option?.sale?.toLocaleString() || '0'}</span>
                    </span>
                  </div>
                </button>
              );
            })}

            <button
              onClick={handleAddToCart}
              style={{
                fontFamily: 'Noto Sans KR',
                width: '100%',
                padding: '20px 0',
                backgroundColor: '#ED6051',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '17px',
                margin: '5px 0',
                cursor: 'pointer',
              }}
            >
              수강신청 하기
            </button>

            {/* 장바구니 팝업 모달 */}
            {isCartModalOpen && (
              <div style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex',
                justifyContent: 'center', alignItems: 'center', zIndex: 9999
              }}>
                <div style={{
                  position: 'relative',
                  background: '#fff',
                  padding: '30px 40px',
                  borderRadius: '10px',
                  maxWidth: '400px',
                  textAlign: 'center'
                }}>
                  {/* X 닫기 버튼 */}
                  <button
                    onClick={() => setIsCartModalOpen(false)}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '0px',
                      background: 'transparent',
                      border: 'none',
                      fontSize: '18px',
                      cursor: 'pointer',
                      color: '#999'
                    }}
                    aria-label="닫기"
                  >
                    ✕
                  </button>

                  <h3 style={{ marginBottom: '23px', fontSize: '15px' }}>장바구니에 담겼습니다!</h3>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <button
                      onClick={() => {
                        setIsCartModalOpen(false);
                        navigate('/cart');
                      }}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#ED6051',
                        color: '#fff',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    >
                      장바구니로 이동
                    </button>
                    <button
                      onClick={() => setIsCartModalOpen(false)}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#eee',
                        color: '#333',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    >
                      계속 쇼핑하기
                    </button>
                  </div>
                </div>
              </div>
            )}


            {/* 아이콘 메뉴 */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '40px',
              marginTop: '17px'
            }}>
              {iconMenuList.map(({ label, icon, size }) => (
                <button
                  key={label}
                  onClick={() => {
                    if (label === '미리보기') {
                      setIsModalOpen(true);
                    } else if (label === '공유하기') {
                      const currentUrl = window.location.href;
                      navigator.clipboard.writeText(currentUrl)
                        .then(() => setIsShareModalOpen(true))
                        .catch((err) => {
                          console.error('링크 복사 실패:', err);
                          alert('링크 복사에 실패했습니다.');
                        });
                    }
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    color: '#999',
                    fontSize: '13px',
                  }}
                >
                  <img
                    src={icon}
                    alt={label}
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      marginBottom: '6px',
                      filter: 'grayscale(100%)' // 선택적: 회색 톤으로 통일
                    }}
                  />
                  <span>{label}</span>
                </button>
              ))}
            </div>

          </div>
        </aside>

        {/* 미리보기 팝업 */}
        {isModalOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}>
            <div style={{
              position: 'relative',
              width: '90%',
              maxWidth: '640px',
              backgroundColor: '#fff',
              borderRadius: '14px',
              padding: '32px',
              textAlign: 'left',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}>
              {/* 닫기 버튼 */}
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '20px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '18px',
                  color: '#333',
                  cursor: 'pointer'
                }}
                aria-label="닫기"
              >
                ✕
              </button>

              {/* 제목 */}
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0px' }}>
                클래스 미리보기
              </h2>

              {/* 소제목 */}
              <p style={{ fontSize: '14px', color: '#444', marginBottom: '20px' }}>
                1. 인공지능/파이썬 시작과 개발 환경
              </p>

              {/* 비디오 */}
              <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
                <video
                  controls
                  autoPlay
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                >
                  <source src="/videos/preview.mp4" type="video/mp4" />
                  미리보기 영상을 지원하지 않는 브라우저입니다.
                </video>
              </div>
            </div>
          </div>
        )}

        {/* 공유하기 팝업 */}
        {isShareModalOpen && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000
          }}>
            <div style={{
              position: 'relative',
              background: '#fff',
              padding: '30px 20px',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              width: '380px',
              border: '1px solid #ddd'
            }}>
              {/* X 닫기 버튼 */}
              <button
                onClick={() => setIsShareModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '14px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer',
                  color: '#999'
                }}
              >
                ✕
              </button>

              {/* 텍스트 */}
              <p style={{ marginBottom: '20px', fontSize: '16px', fontWeight: 'bold' }}>
                페이지 링크가 복사되었습니다!
              </p>

              {/* 링크 + 공유 버튼 (분리된 구조) */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f1f1f1',
                borderRadius: '10px',
                padding: '10px',
                fontSize: '14px',
                userSelect: 'text',
              }}>
                {/* 링크 영역 (스크롤 가능) */}
                <div
                  style={{
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    flex: 1,
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE/Edge
                  }}
                  className="no-scrollbar"
                >
                  <span>{window.location.href}</span>
                </div>

                {/* 공유 아이콘 버튼 (고정 위치) */}
                <button
                  style={{
                    marginLeft: '10px',
                    backgroundColor: '#888',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '5px',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                  aria-label="복사됨"
                >
                  <img src="/icons/d_share.svg" alt="복사 아이콘" style={{ width: '16px', height: '16px' }} />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default CoursedetailPage;

const sectionTitleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '20px',
  borderLeft: '4px solid #333',
  paddingLeft: '10px',
};

const boxStyle = {
  border: '1px solid #D9D9D9',
  borderRadius: '10px',
  padding: '24px',
  fontSize: '15px',
  lineHeight: '2',
};

const dotItemStyle = {
  marginBottom: '12px',
};
const dotstyle = {
 color: '#5584B0',
 fontSize: '13px',
 marginRight: '4px',
};

const dotstyle2 = {
  color: '#5584B0',
 fontSize: '13px',
 marginRight: '4px',
};